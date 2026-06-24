import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { Home } from "./pages/Home.js";

const app = new Hono();

app.use("*", jsxRenderer());

app.get("/", (c) => c.render(Home()));

const port = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic is listening on http://localhost:${info.port}`);
});
