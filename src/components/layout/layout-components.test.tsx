import { describe, expect, it } from "vitest";
import { layoutCssHref, picoCssHref } from "../../styles/index.js";
import { renderPage } from "../../test/helpers.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { Layout } from "./Layout.js";
import { Main } from "./Main.js";
import { Nav } from "./Nav.js";

describe("Nav", () => {
  it("renders list items with anchor links", async () => {
    const html = await renderPage(() => <Nav currentPath="/" />);

    expect(html).toContain("<li>");
    expect(html).toContain('href="/"');
    expect(html).toContain(">Home</a>");
    expect(html).toContain('href="/agents"');
    expect(html).toContain(">Agents</a>");
  });
});

describe("Header", () => {
  it("renders Pico container header with branding and nav", async () => {
    const html = await renderPage(() => <Header currentPath="/" />);

    expect(html).toContain('class="container"');
    expect(html).toContain('aria-label="Main"');
    expect(html).toContain("<h1>AgentClinic</h1>");
    expect(html).toContain('href="/"');
    expect(html).toContain(">Home</a>");
  });
});

describe("Main", () => {
  it("wraps children in a Pico container main region", async () => {
    const Page = () => (
      <Main>
        <p>Test content</p>
      </Main>
    );

    const html = await renderPage(Page);

    expect(html).toContain('<main class="container">');
    expect(html).toContain("<p>Test content</p>");
  });
});

describe("Footer", () => {
  it("renders shared footer copy in a container footer", async () => {
    const html = await renderPage(Footer);

    expect(html).toContain('<footer class="container">');
    expect(html).toContain("Server-rendered wellness for AI agents");
  });
});

describe("Layout", () => {
  it("links Pico and layout stylesheets and composes header, main, and footer", async () => {
    const Page = () => (
      <Layout currentPath="/">
        <p>Page body</p>
      </Layout>
    );

    const html = await renderPage(Page);

    expect(html).toContain(`href="${picoCssHref}"`);
    expect(html).toContain(`href="${layoutCssHref}"`);
    expect(html).toContain('name="viewport"');
    expect(html).toContain('name="color-scheme"');
    expect(html).toContain('aria-label="Main"');
    expect(html).toContain('<main class="container">');
    expect(html).toContain('<footer class="container">');
    expect(html).toContain("<p>Page body</p>");
  });
});
