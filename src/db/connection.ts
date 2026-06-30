import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { migrate } from "./migrate.js";
import { seed } from "./seed.js";

let db: Database.Database | null = null;
let initialized = false;

export function getDbPath(): string {
  return process.env.DATABASE_PATH ?? "data/agentclinic.db";
}

export function isDbInitialized(): boolean {
  return initialized;
}

export function getDb(): Database.Database {
  if (!db) {
    const path = getDbPath();
    if (path !== ":memory:") {
      mkdirSync(dirname(path), { recursive: true });
    }
    db = new Database(path);
    db.pragma("foreign_keys = ON");
  }

  if (!initialized) {
    migrate(db);
    seed(db);
    initialized = true;
  }

  return db;
}

export function resetDbState(): void {
  if (db) {
    db.close();
    db = null;
  }
  initialized = false;
}
