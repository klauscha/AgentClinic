import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Home } from "./pages/Home.js";

const app = new Hono();
const stylesRoot = join(dirname(fileURLToPath(import.meta.url)), "styles");

app.use(
  "/styles/*",
  serveStatic({
    root: stylesRoot,
    rewriteRequestPath: (path) => path.replace(/^\/styles\//, ""),
  }),
);
app.use("*", jsxRenderer());

app.get("/", (c) => c.render(Home()));

const port = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic is listening on http://localhost:${info.port}`);
});
