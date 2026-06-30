import { beforeEach, describe, expect, it } from "vitest";
import { layoutCssHref, picoCssHref } from "../styles/index.js";
import { setupTestDb } from "../test/db.js";
import { requestApp } from "../test/helpers.js";

describe("agents route", () => {
  beforeEach(() => {
    setupTestDb();
  });

  it("GET /agents returns 200 with text/html", async () => {
    const response = await requestApp("/agents");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
  });

  it("GET /agents lists seeded agents inside layout", async () => {
    const body = await (await requestApp("/agents")).text();

    expect(body).toContain("<h1>Agents</h1>");
    expect(body).toContain("Claude the Anxious");
    expect(body).toContain("Agent Zero");
    expect(body).toContain('href="/agents/1"');
    expect(body).toContain('class="container"');
    expect(body).toContain('aria-label="Main"');
  });

  it("GET /agents marks the Agents nav link active", async () => {
    const body = await (await requestApp("/agents")).text();

    expect(body).toContain('href="/agents" aria-current="page"');
    expect(body).not.toMatch(/href="\/"[^>]*aria-current="page"/);
  });

  it("GET /agents links Pico before layout.css with a page-specific title", async () => {
    const body = await (await requestApp("/agents")).text();

    expect(body).toContain("<title>Agents — AgentClinic</title>");
    expect(body.indexOf(picoCssHref)).toBeLessThan(body.indexOf(layoutCssHref));
  });
});
