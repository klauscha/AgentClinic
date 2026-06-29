import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const layoutDir = join(dirname(fileURLToPath(import.meta.url)));

describe("layout module structure", () => {
  it("defines Header, Main, Footer, and Layout in separate files", () => {
    for (const file of ["Header.tsx", "Main.tsx", "Footer.tsx", "Layout.tsx"]) {
      expect(existsSync(join(layoutDir, file))).toBe(true);
    }
  });

  it("composes subcomponents in Layout via imports only", () => {
    const layoutSource = readFileSync(join(layoutDir, "Layout.tsx"), "utf8");

    expect(layoutSource).toContain('from "./Header.js"');
    expect(layoutSource).toContain('from "./Main.js"');
    expect(layoutSource).toContain('from "./Footer.js"');
    expect(layoutSource).not.toMatch(/<header[\s>]/);
    expect(layoutSource).not.toMatch(/<footer[\s>]/);
    expect(layoutSource).not.toMatch(/<main[\s>]/);
  });
});
