import { getDb } from "../db/index.js";
import type { Agent, AilmentWithAgentCount } from "./types.js";
import { countPendingAppointments, listRecentAppointments } from "./appointments.js";

export type DashboardStats = {
  agentCount: number;
  pendingAppointments: number;
  agentsWithAilments: number;
};

export function getDashboardStats(): DashboardStats {
  const agentCount = (
    getDb().prepare("SELECT COUNT(*) AS count FROM agents").get() as { count: number }
  ).count;

  const agentsWithAilments = (
    getDb()
      .prepare("SELECT COUNT(DISTINCT agent_id) AS count FROM agent_ailments")
      .get() as { count: number }
  ).count;

  return {
    agentCount,
    pendingAppointments: countPendingAppointments(),
    agentsWithAilments,
  };
}

export function listAgentsForDashboard(): Agent[] {
  return getDb()
    .prepare(
      "SELECT id, name, model_type, status, presenting_complaints FROM agents ORDER BY name",
    )
    .all() as Agent[];
}

export function listAilmentsForDashboard(): AilmentWithAgentCount[] {
  return getDb()
    .prepare(
      `SELECT a.id, a.name, a.description,
              COUNT(aa.agent_id) AS agent_count
       FROM ailments a
       LEFT JOIN agent_ailments aa ON aa.ailment_id = a.id
       GROUP BY a.id
       ORDER BY a.name`,
    )
    .all() as AilmentWithAgentCount[];
}

export { listRecentAppointments };
