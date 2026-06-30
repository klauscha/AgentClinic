import { describe, expect, it } from "vitest";
import { renderPage } from "../../test/helpers.js";
import { Nav } from "./Nav.js";

describe("Nav", () => {
  it("renders Pico nav links inside a ul", async () => {
    const Page = () => <Nav currentPath="/" />;
    const html = await renderPage(Page);

    expect(html).toContain("<ul>");
    expect(html).toContain('href="/"');
    expect(html).toContain(">Home</a>");
    expect(html).toContain('href="/agents"');
    expect(html).toContain(">Agents</a>");
  });

  it("sets aria-current=page on the exact pathname match", async () => {
    const homeHtml = await renderPage(() => <Nav currentPath="/" />);
    const agentsHtml = await renderPage(() => <Nav currentPath="/agents" />);

    expect(homeHtml).toContain('href="/" aria-current="page"');
    expect(homeHtml).not.toContain('href="/agents" aria-current="page"');

    expect(agentsHtml).toContain('href="/agents" aria-current="page"');
    expect(agentsHtml).not.toContain('href="/" aria-current="page"');
  });

  it("does not set aria-current on inactive links", async () => {
    const html = await renderPage(() => <Nav currentPath="/agents" />);

    expect(html).not.toMatch(/href="\/"[^>]*aria-current/);
  });
});
