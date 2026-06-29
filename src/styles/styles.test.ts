import { describe, expect, it } from "vitest";
import { layoutCssHref } from "./index.js";

describe("layoutCssHref", () => {
  it("points at the public layout stylesheet path", () => {
    expect(layoutCssHref).toBe("/styles/layout.css");
  });
});
