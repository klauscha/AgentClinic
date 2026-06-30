import { getDb } from "../db/index.js";
import type { AilmentWithAgentCount } from "./types.js";

export function listAilments(): AilmentWithAgentCount[] {
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
