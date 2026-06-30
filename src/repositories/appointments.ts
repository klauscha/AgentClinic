import { getDb } from "../db/index.js";
import type { Appointment, AppointmentWithAgent } from "./types.js";

export function createAppointment(
  agentId: number,
  scheduledAt: string,
): Appointment {
  const result = getDb()
    .prepare(
      "INSERT INTO appointments (agent_id, scheduled_at, status) VALUES (?, ?, 'pending')",
    )
    .run(agentId, scheduledAt);

  const appointment = getAppointmentById(Number(result.lastInsertRowid));
  if (!appointment) {
    throw new Error("Failed to create appointment");
  }
  return appointment;
}

export function getAppointmentById(id: number): Appointment | undefined {
  return getDb()
    .prepare(
      "SELECT id, agent_id, scheduled_at, status, created_at FROM appointments WHERE id = ?",
    )
    .get(id) as Appointment | undefined;
}

export function getAppointmentWithAgent(id: number): AppointmentWithAgent | undefined {
  return getDb()
    .prepare(
      `SELECT ap.id, ap.agent_id, ap.scheduled_at, ap.status, ap.created_at, ag.name AS agent_name
       FROM appointments ap
       INNER JOIN agents ag ON ag.id = ap.agent_id
       WHERE ap.id = ?`,
    )
    .get(id) as AppointmentWithAgent | undefined;
}

export function listRecentAppointments(limit = 10): AppointmentWithAgent[] {
  return getDb()
    .prepare(
      `SELECT ap.id, ap.agent_id, ap.scheduled_at, ap.status, ap.created_at, ag.name AS agent_name
       FROM appointments ap
       INNER JOIN agents ag ON ag.id = ap.agent_id
       ORDER BY ap.scheduled_at DESC
       LIMIT ?`,
    )
    .all(limit) as AppointmentWithAgent[];
}

export function countPendingAppointments(): number {
  const row = getDb()
    .prepare("SELECT COUNT(*) AS count FROM appointments WHERE status = 'pending'")
    .get() as { count: number };
  return row.count;
}
