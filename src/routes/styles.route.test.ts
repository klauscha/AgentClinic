import { describe, expect, it } from "vitest";
import { layoutCssHref, picoCssHref } from "../styles/index.js";
import { requestApp } from "../test/helpers.js";

describe("stylesheet routes", () => {
  it(`GET ${picoCssHref} returns 200 with text/css`, async () => {
    const response = await requestApp(picoCssHref);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/css");
  });

  it(`GET ${picoCssHref} serves Pico CSS`, async () => {
    const body = await (await requestApp(picoCssHref)).text();

    expect(body).toContain(":root");
    expect(body).toContain("--pico-font-family");
  });

  it(`GET ${layoutCssHref} returns 200 with text/css`, async () => {
    const response = await requestApp(layoutCssHref);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/css");
  });

  it(`GET ${layoutCssHref} serves AgentClinic override rules`, async () => {
    const body = await (await requestApp(layoutCssHref)).text();

    expect(body).toContain("--pico-primary");
    expect(body).toContain('nav a[aria-current="page"]');
    expect(body).toContain("main.container");
  });

  it("GET /styles/unknown.css returns 404", async () => {
    const response = await requestApp("/styles/unknown.css");

    expect(response.status).toBe(404);
  });
});
