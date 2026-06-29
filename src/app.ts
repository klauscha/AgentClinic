import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Home } from "./pages/Home.js";

const stylesRoot = join(dirname(fileURLToPath(import.meta.url)), "styles");

export const app = new Hono();

app.use(
  "/styles/*",
  serveStatic({
    root: stylesRoot,
    rewriteRequestPath: (path) => path.replace(/^\/styles\//, ""),
  }),
);
app.use("*", jsxRenderer());

app.get("/", (c) => c.render(Home()));
