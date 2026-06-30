import { beforeEach, describe, expect, it } from "vitest";
import {
  SEED_AGENT_COUNT,
  SEED_AILMENT_COUNT,
  SEED_APPOINTMENT_COUNT,
  SEED_THERAPY_COUNT,
} from "../db/seed.js";
import { getDb } from "../db/index.js";
import { setupTestDb } from "../test/db.js";

describe("database", () => {
  beforeEach(() => {
    setupTestDb();
  });

  it("creates all MVP tables", () => {
    const database = getDb();
    const tables = database
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
      )
      .all() as { name: string }[];

    expect(tables.map((t) => t.name)).toEqual(
      expect.arrayContaining([
        "agents",
        "ailments",
        "therapies",
        "agent_ailments",
        "ailment_therapies",
        "appointments",
        "schema_migrations",
      ]),
    );
  });

  it("seeds demo-ready row counts", () => {
    const database = getDb();
    const agents = database.prepare("SELECT COUNT(*) AS count FROM agents").get() as {
      count: number;
    };
    const ailments = database.prepare("SELECT COUNT(*) AS count FROM ailments").get() as {
      count: number;
    };
    const therapies = database.prepare("SELECT COUNT(*) AS count FROM therapies").get() as {
      count: number;
    };
    const appointments = database
      .prepare("SELECT COUNT(*) AS count FROM appointments")
      .get() as { count: number };

    expect(agents.count).toBe(SEED_AGENT_COUNT);
    expect(ailments.count).toBe(SEED_AILMENT_COUNT);
    expect(therapies.count).toBe(SEED_THERAPY_COUNT);
    expect(appointments.count).toBe(SEED_APPOINTMENT_COUNT);
  });
});
