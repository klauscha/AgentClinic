import { describe, expect, it } from "vitest";
import { layoutCssHref, picoCssHref } from "../styles/index.js";
import { requestApp } from "../test/helpers.js";

describe("agents route", () => {
  it("GET /agents returns 200 with text/html", async () => {
    const response = await requestApp("/agents");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
  });

  it("GET /agents includes coming soon content inside layout", async () => {
    const body = await (await requestApp("/agents")).text();

    expect(body).toContain("<h2>Agents</h2>");
    expect(body).toContain("Agent listings are coming soon");
    expect(body).toContain('class="container"');
    expect(body).toContain('aria-label="Main"');
  });

  it("GET /agents marks the Agents nav link active", async () => {
    const body = await (await requestApp("/agents")).text();

    expect(body).toContain('href="/agents" aria-current="page"');
    expect(body).not.toMatch(/href="\/"[^>]*aria-current="page"/);
  });

  it("GET /agents links Pico and layout stylesheets", async () => {
    const body = await (await requestApp("/agents")).text();

    expect(body).toContain(`href="${picoCssHref}"`);
    expect(body).toContain(`href="${layoutCssHref}"`);
  });
});
