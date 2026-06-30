import { beforeEach, describe, expect, it } from "vitest";
import { setupTestDb } from "../test/db.js";
import { requestApp } from "../test/helpers.js";

describe("agent detail route", () => {
  beforeEach(() => {
    setupTestDb();
  });

  it("GET /agents/:id returns agent profile fields", async () => {
    const body = await (await requestApp("/agents/1")).text();

    expect((await requestApp("/agents/1")).status).toBe(200);
    expect(body).toContain("Claude the Anxious");
    expect(body).toContain("frontier");
    expect(body).toContain("waiting");
    expect(body).toContain("Apologizes excessively");
    expect(body).toContain("context-window claustrophobia");
  });

  it("GET /agents/:id returns 404 for unknown id", async () => {
    const response = await requestApp("/agents/9999");

    expect(response.status).toBe(404);
    expect(await response.text()).toContain("Agent not found");
  });
});
