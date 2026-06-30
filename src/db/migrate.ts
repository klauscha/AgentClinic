import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type Database from "better-sqlite3";
import { getDb } from "./connection.js";

const moduleDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(moduleDir, "..", "..");

const MIGRATIONS = ["001_init.sql"] as const;

function hasMigrationsTable(database: Database.Database): boolean {
  return Boolean(
    database
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'schema_migrations'")
      .get(),
  );
}

export function migrate(database: Database.Database = getDb()): void {
  const migrationsTableExists = hasMigrationsTable(database);

  for (const file of MIGRATIONS) {
    const id = file.replace(/\.sql$/, "");

    if (migrationsTableExists) {
      const applied = database
        .prepare("SELECT id FROM schema_migrations WHERE id = ?")
        .get(id) as { id: string } | undefined;

      if (applied) {
        continue;
      }
    }

    const sql = readFileSync(join(projectRoot, "migrations", file), "utf8");
    database.exec(sql);
    database.prepare("INSERT INTO schema_migrations (id) VALUES (?)").run(id);
  }
}
