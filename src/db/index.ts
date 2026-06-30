import { getDb, resetDbState } from "./connection.js";

export { getDb, getDbPath, isDbInitialized, resetDbState } from "./connection.js";
export {
  SEED_AGENT_COUNT,
  SEED_AILMENT_COUNT,
  SEED_THERAPY_COUNT,
  SEED_APPOINTMENT_COUNT,
  SEED_AGENTS_WITH_AILMENTS,
} from "./seed.js";

export function initDb(): void {
  getDb();
}

export function resetDb(): void {
  resetDbState();
}
