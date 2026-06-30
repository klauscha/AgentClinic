import { describe, expect, it } from "vitest";
import { layoutCssHref, picoCssHref } from "../styles/index.js";
import { requestApp } from "../test/helpers.js";

describe("home route", () => {
  it("GET / returns 200 with text/html", async () => {
    const response = await requestApp("/");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
  });

  it("GET / includes the clinic heading and home tagline", async () => {
    const body = await (await requestApp("/")).text();

    expect(body).toContain("<h1>AgentClinic</h1>");
    expect(body).toContain("AgentClinic is open for business");
  });

  it("GET / renders nav, Pico landmarks, and both stylesheets", async () => {
    const body = await (await requestApp("/")).text();

    expect(body).toContain('aria-label="Main"');
    expect(body).toContain('href="/"');
    expect(body).toContain(">Home</a>");
    expect(body).toContain('href="/agents"');
    expect(body).toContain(">Agents</a>");
    expect(body).toContain('href="/" aria-current="page"');
    expect(body).not.toContain('href="/agents" aria-current="page"');
    expect(body).toContain('class="container"');
    expect(body).toContain(`href="${picoCssHref}"`);
    expect(body).toContain(`href="${layoutCssHref}"`);
  });

  it("GET / uses a semantic HTML document shell with viewport and color-scheme meta", async () => {
    const body = await (await requestApp("/")).text();

    expect(body).toContain('<html lang="en">');
    expect(body).toContain("<head>");
    expect(body).toContain("<body>");
    expect(body).toContain("<title>AgentClinic</title>");
    expect(body).toContain('name="viewport"');
    expect(body).toContain("width=device-width");
    expect(body).toContain('name="color-scheme"');
    expect(body).toContain("light dark");
  });
});

describe("unknown routes", () => {
  it("GET /missing returns 404", async () => {
    const response = await requestApp("/missing");

    expect(response.status).toBe(404);
  });
});
