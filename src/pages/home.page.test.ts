import { describe, expect, it } from "vitest";
import { renderPage } from "../test/helpers.js";
import { Home } from "./Home.js";

describe("Home page", () => {
  it("renders inside Layout with the open-for-business tagline", async () => {
    const html = await renderPage(Home);

    expect(html).toContain("<h1>AgentClinic</h1>");
    expect(html).toContain("AgentClinic is open for business");
    expect(html).toContain('<main class="container">');
    expect(html).toContain('href="/" aria-current="page"');
  });
});
