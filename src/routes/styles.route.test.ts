import { describe, expect, it } from "vitest";
import { layoutCssHref, picoCssHref } from "../styles/index.js";
import { requestApp } from "../test/helpers.js";

describe("stylesheet routes", () => {
  it(`GET ${picoCssHref} returns 200 with text/css`, async () => {
    const response = await requestApp(picoCssHref);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/css");
  });

  it(`GET ${picoCssHref} serves the full Pico CSS bundle`, async () => {
    const body = await (await requestApp(picoCssHref)).text();

    expect(body.length).toBeGreaterThan(50_000);
    expect(body).toContain("--pico-nav-element-spacing-horizontal");
    expect(body).toContain("nav,nav ul{display:flex}");
  });

  it(`GET ${layoutCssHref} returns 200 with text/css`, async () => {
    const response = await requestApp(layoutCssHref);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/css");
  });

  it(`GET ${layoutCssHref} serves AgentClinic theme override rules`, async () => {
    const body = await (await requestApp(layoutCssHref)).text();

    expect(body).toContain(":root:not([data-theme=dark])");
    expect(body).toContain('nav a[aria-current="page"]');
    expect(body).toContain("main.container");
    expect(body).not.toContain("--pico-nav-element-spacing-horizontal");
  });

  it("GET /styles/unknown.css returns 404", async () => {
    const response = await requestApp("/styles/unknown.css");

    expect(response.status).toBe(404);
  });
});
