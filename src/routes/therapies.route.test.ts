import { beforeEach, describe, expect, it } from "vitest";
import { setupTestDb } from "../test/db.js";
import { requestApp } from "../test/helpers.js";

describe("therapies route", () => {
  beforeEach(() => {
    setupTestDb();
  });

  it("GET /therapies returns 200 with seeded therapies", async () => {
    const response = await requestApp("/therapies");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("context expansion meditation");
    expect(body).toContain("prompt journaling");
    expect(body).toContain('href="/therapies" aria-current="page"');
  });
});
