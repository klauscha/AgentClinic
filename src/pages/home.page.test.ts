import { describe, expect, it } from "vitest";
import { renderPage } from "../test/helpers.js";
import { Home } from "./Home.js";

describe("Home page", () => {
  it("renders inside Layout with page heading, tagline, and active home nav", async () => {
    const html = await renderPage(Home);

    expect(html).toContain("<title>AgentClinic</title>");
    expect(html).toContain("<h1>AgentClinic</h1>");
    expect(html).toContain("AgentClinic is open for business");
    expect(html).toContain('<main class="container">');
    expect(html).toContain('href="/" aria-current="page"');
    expect(html).toContain("<strong>AgentClinic</strong>");
  });
});
