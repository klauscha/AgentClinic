import { describe, expect, it } from "vitest";
import { layoutCssHref } from "../../styles/index.js";
import { renderPage } from "../../test/helpers.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { Layout } from "./Layout.js";
import { Main } from "./Main.js";

describe("Header", () => {
  it("renders the clinic name in a site header", async () => {
    const html = await renderPage(Header);

    expect(html).toContain('class="site-header"');
    expect(html).toContain("<h1>AgentClinic</h1>");
  });
});

describe("Main", () => {
  it("wraps children in a site-main region", async () => {
    const Page = () => (
      <Main>
        <p>Test content</p>
      </Main>
    );

    const html = await renderPage(Page);

    expect(html).toContain('class="site-main"');
    expect(html).toContain("<p>Test content</p>");
  });
});

describe("Footer", () => {
  it("renders shared footer copy in a site-footer region", async () => {
    const html = await renderPage(Footer);

    expect(html).toContain('class="site-footer"');
    expect(html).toContain("Server-rendered wellness for AI agents");
  });
});

describe("Layout", () => {
  it("links the layout stylesheet and composes header, main, and footer", async () => {
    const Page = () => (
      <Layout>
        <p>Page body</p>
      </Layout>
    );

    const html = await renderPage(Page);

    expect(html).toContain(`href="${layoutCssHref}"`);
    expect(html).toContain('class="site-header"');
    expect(html).toContain('class="site-main"');
    expect(html).toContain('class="site-footer"');
    expect(html).toContain("<p>Page body</p>");
  });
});
