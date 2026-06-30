import { getDb } from "../db/index.js";
import type { Agent, Ailment } from "./types.js";

export function listAgents(): Agent[] {
  return getDb()
    .prepare(
      "SELECT id, name, model_type, status, presenting_complaints FROM agents ORDER BY name",
    )
    .all() as Agent[];
}

export function getAgentById(id: number): Agent | undefined {
  return getDb()
    .prepare(
      "SELECT id, name, model_type, status, presenting_complaints FROM agents WHERE id = ?",
    )
    .get(id) as Agent | undefined;
}

export function getAilmentsForAgent(agentId: number): Ailment[] {
  return getDb()
    .prepare(
      `SELECT a.id, a.name, a.description
       FROM ailments a
       INNER JOIN agent_ailments aa ON aa.ailment_id = a.id
       WHERE aa.agent_id = ?
       ORDER BY a.name`,
    )
    .all(agentId) as Ailment[];
}
