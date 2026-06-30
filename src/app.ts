import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseScheduledAt } from "./lib/datetime.js";
import { AgentDetail } from "./pages/AgentDetail.js";
import { AgentsList } from "./pages/AgentsList.js";
import { AilmentsList } from "./pages/AilmentsList.js";
import { BookingConfirmation } from "./pages/BookingConfirmation.js";
import { Dashboard } from "./pages/Dashboard.js";
import { Home } from "./pages/Home.js";
import { TherapiesList } from "./pages/TherapiesList.js";
import { createAppointment, getAppointmentWithAgent } from "./repositories/appointments.js";
import { getAgentById } from "./repositories/agents.js";

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
app.get("/agents", (c) => c.render(AgentsList()));
app.get("/agents/:id", (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0 || !getAgentById(id)) {
    return c.text("Agent not found", 404);
  }
  return c.render(AgentDetail({ agentId: id }));
});
app.post("/agents/:id/book", async (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0 || !getAgentById(id)) {
    return c.text("Agent not found", 404);
  }

  const body = await c.req.parseBody();
  const scheduledAt = parseScheduledAt(body.scheduled_at);
  if (!scheduledAt) {
    c.status(400);
    return c.render(
      AgentDetail({
        agentId: id,
        bookingError: "Please provide a valid appointment date and time.",
      }),
    );
  }

  const appointment = createAppointment(id, scheduledAt);
  return c.redirect(`/appointments/${appointment.id}/confirmation`, 303);
});
app.get("/appointments/:id/confirmation", (c) => {
  const id = Number(c.req.param("id"));
  const appointment = getAppointmentWithAgent(id);
  if (!appointment) {
    return c.text("Appointment not found", 404);
  }
  return c.render(BookingConfirmation({ appointment }));
});
app.get("/ailments", (c) => c.render(AilmentsList()));
app.get("/therapies", (c) => c.render(TherapiesList()));
app.get("/dashboard", (c) => c.render(Dashboard()));
