import { getDb } from "../db/index.js";
import type { TherapyWithAilments } from "./types.js";

export function listTherapies(): TherapyWithAilments[] {
  const therapies = getDb()
    .prepare("SELECT id, name, description FROM therapies ORDER BY name")
    .all() as { id: number; name: string; description: string }[];

  const ailmentsByTherapy = getDb()
    .prepare(
      `SELECT at.therapy_id, a.name
       FROM ailment_therapies at
       INNER JOIN ailments a ON a.id = at.ailment_id
       ORDER BY a.name`,
    )
    .all() as { therapy_id: number; name: string }[];

  const map = new Map<number, string[]>();
  for (const row of ailmentsByTherapy) {
    const list = map.get(row.therapy_id) ?? [];
    list.push(row.name);
    map.set(row.therapy_id, list);
  }

  return therapies.map((therapy) => ({
    ...therapy,
    ailments: map.get(therapy.id) ?? [],
  }));
}
