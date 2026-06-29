import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { app } from "../app.js";

const baseUrl = "http://localhost";

type PageComponent = () => unknown;

/** Issue a request against the exported Hono app (no live server required). */
export async function requestApp(path: string, init?: RequestInit): Promise<Response> {
  return app.fetch(new Request(`${baseUrl}${path}`, init));
}

/** Render a JSX page component through Hono's jsx renderer for markup assertions. */
export async function renderPage(Component: PageComponent): Promise<string> {
  const renderer = new Hono();
  renderer.use("*", jsxRenderer());
  renderer.get("/", (c) => c.render(Component() as never));

  const response = await renderer.fetch(new Request(`${baseUrl}/`));
  return response.text();
}
