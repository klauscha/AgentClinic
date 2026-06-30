import { describe, expect, it } from "vitest";
import { layoutCssHref, picoCssHref } from "./index.js";

describe("stylesheet href exports", () => {
  it("points at the public Pico stylesheet path", () => {
    expect(picoCssHref).toBe("/styles/pico.min.css");
  });

  it("points at the public layout override stylesheet path", () => {
    expect(layoutCssHref).toBe("/styles/layout.css");
  });
});
