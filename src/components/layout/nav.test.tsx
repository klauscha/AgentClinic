import { describe, expect, it } from "vitest";
import { renderPage } from "../../test/helpers.js";
import { Header } from "./Header.js";
import { Nav } from "./Nav.js";

describe("Nav", () => {
  it("renders all MVP nav links inside a ul when composed in Header", async () => {
    const html = await renderPage(() => <Header currentPath="/" />);

    expect(html).toContain("<nav");
    expect(html).toContain("<ul>");
    expect(html).toContain('href="/"');
    expect(html).toContain(">Home</a>");
    expect(html).toContain('href="/agents"');
    expect(html).toContain(">Agents</a>");
    expect(html).toContain('href="/ailments"');
    expect(html).toContain(">Ailments</a>");
    expect(html).toContain('href="/therapies"');
    expect(html).toContain(">Therapies</a>");
    expect(html).toContain('href="/dashboard"');
    expect(html).toContain(">Dashboard</a>");
  });

  it("sets aria-current=page on the exact pathname match", async () => {
    const dashboardHtml = await renderPage(() => <Nav currentPath="/dashboard" />);

    expect(dashboardHtml).toContain('href="/dashboard" aria-current="page"');
    expect(dashboardHtml).not.toContain('href="/agents" aria-current="page"');
  });

  it("does not set aria-current on Agents when on agent detail path", async () => {
    const html = await renderPage(() => <Nav currentPath="/agents/1" />);

    expect(html).not.toContain('aria-current="page"');
  });
});
