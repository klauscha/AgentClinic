import { beforeEach, describe, expect, it } from "vitest";
import { setupTestDb } from "../test/db.js";
import { requestApp } from "../test/helpers.js";

describe("ailments route", () => {
  beforeEach(() => {
    setupTestDb();
  });

  it("GET /ailments returns 200 with seeded ailments", async () => {
    const response = await requestApp("/ailments");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("context-window claustrophobia");
    expect(body).toContain("prompt fatigue");
    expect(body).toContain('href="/ailments" aria-current="page"');
  });
});
