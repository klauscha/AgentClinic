import { initDb, resetDb } from "../db/index.js";

export function setupTestDb(): void {
  process.env.DATABASE_PATH = ":memory:";
  resetDb();
  initDb();
}
