import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AgentsComingSoon } from "./pages/AgentsComingSoon.js";
import { Home } from "./pages/Home.js";

const moduleDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(moduleDir, "..");
const stylesRoot = join(moduleDir, "styles");
const picoRoot = join(projectRoot, "node_modules", "@picocss", "pico", "css");

export const app = new Hono();

app.use(
  "/styles/pico.min.css",
  serveStatic({
    root: picoRoot,
    rewriteRequestPath: () => "pico.min.css",
  }),
);
app.use(
  "/styles/*",
  serveStatic({
    root: stylesRoot,
    rewriteRequestPath: (path) => path.replace(/^\/styles\//, ""),
  }),
);
app.use("*", jsxRenderer());

app.get("/", (c) => c.render(Home()));
app.get("/agents", (c) => c.render(AgentsComingSoon()));
