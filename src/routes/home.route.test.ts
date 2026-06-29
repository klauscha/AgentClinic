import { describe, expect, it } from "vitest";
import { layoutCssHref } from "../styles/index.js";
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

  it("GET / renders layout regions and links the stylesheet", async () => {
    const body = await (await requestApp("/")).text();

    expect(body).toContain('class="site-header"');
    expect(body).toContain('class="site-main"');
    expect(body).toContain('class="site-footer"');
    expect(body).toContain(`href="${layoutCssHref}"`);
  });

  it("GET / uses a semantic HTML document shell with viewport meta", async () => {
    const body = await (await requestApp("/")).text();

    expect(body).toContain('<html lang="en">');
    expect(body).toContain("<head>");
    expect(body).toContain("<body>");
    expect(body).toContain("<title>AgentClinic</title>");
    expect(body).toContain('name="viewport"');
    expect(body).toContain("width=device-width");
  });
});

describe("unknown routes", () => {
  it("GET /missing returns 404", async () => {
    const response = await requestApp("/missing");

    expect(response.status).toBe(404);
  });
});
