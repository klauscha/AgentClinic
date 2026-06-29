import { describe, expect, it } from "vitest";
import { layoutCssHref } from "../styles/index.js";
import { requestApp } from "../test/helpers.js";

describe("stylesheet route", () => {
  it(`GET ${layoutCssHref} returns 200 with text/css`, async () => {
    const response = await requestApp(layoutCssHref);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/css");
  });

  it(`GET ${layoutCssHref} serves layout custom properties and region classes`, async () => {
    const body = await (await requestApp(layoutCssHref)).text();

    expect(body).toContain(":root");
    expect(body).toContain("--color-accent");
    expect(body).toContain(".site-header");
    expect(body).toContain(".site-main");
    expect(body).toContain(".site-footer");
  });

  it("GET /styles/unknown.css returns 404", async () => {
    const response = await requestApp("/styles/unknown.css");

    expect(response.status).toBe(404);
  });
});
