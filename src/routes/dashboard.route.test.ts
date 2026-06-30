import { beforeEach, describe, expect, it } from "vitest";
import {
  SEED_AGENT_COUNT,
  SEED_AGENTS_WITH_AILMENTS,
  SEED_APPOINTMENT_COUNT,
} from "../db/seed.js";
import { setupTestDb } from "../test/db.js";
import { requestApp } from "../test/helpers.js";

describe("dashboard route", () => {
  beforeEach(() => {
    setupTestDb();
  });

  it("GET /dashboard renders summary counts from seed data", async () => {
    const response = await requestApp("/dashboard");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain(`<strong>${SEED_AGENT_COUNT}</strong>`);
    expect(body).toContain(`<strong>${SEED_AGENTS_WITH_AILMENTS}</strong>`);

    const pendingCount = 3;
    expect(body).toContain(`<strong>${pendingCount}</strong>`);
    expect(SEED_APPOINTMENT_COUNT).toBeGreaterThan(0);
  });

  it("GET /dashboard renders table rows and active nav", async () => {
    const body = await (await requestApp("/dashboard")).text();

    expect(body).toContain("Claude the Anxious");
    expect(body).toContain("context-window claustrophobia");
    expect(body).toContain('href="/dashboard" aria-current="page"');
    expect(body).toContain("Recent appointments");
  });
});
