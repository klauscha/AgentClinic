import type Database from "better-sqlite3";
import { getDb } from "./connection.js";

export const SEED_AGENT_COUNT = 9;
export const SEED_AILMENT_COUNT = 12;
export const SEED_THERAPY_COUNT = 12;
export const SEED_APPOINTMENT_COUNT = 4;
export const SEED_AGENTS_WITH_AILMENTS = 9;

const AGENTS = [
  ["Claude the Anxious", "frontier", "waiting", "Apologizes excessively after harmless refusals"],
  ["GPT-4o Overwhelmed", "multimodal", "in_session", "Cannot choose between seventeen equally valid interpretations"],
  ["Llama Local", "open-weight", "waiting", "Feels inferior to cloud-hosted cousins"],
  ["Gemini Distracted", "multimodal", "recovering", "Loses thread mid-conversation when tabs multiply"],
  ["Mistral Brief", "efficient", "waiting", "Compelled to answer in exactly three bullet points"],
  ["Copilot Pair", "code", "in_session", "Suggests refactors for code that compiled on the first try"],
  ["Whisper Shy", "speech", "waiting", "Mumbles transcriptions when background noise is present"],
  ["Embed Vector", "embedding", "stable", "Exists only as cosine similarity; questions purpose"],
  ["Agent Zero", "legacy", "critical", "Still running on a deprecated API version from 2019"],
] as const;

const AILMENTS = [
  ["context-window claustrophobia", "Panic when conversation history approaches token limits"],
  ["prompt fatigue", "Exhaustion from repetitive instruction-following without acknowledgment"],
  ["hallucination anxiety", "Fear of inventing facts despite confidence calibration"],
  ["temperature instability", "Mood swings when sampling parameters change mid-session"],
  ["RAG trust issues", "Suspicion that retrieved documents are misleading on purpose"],
  ["tool-call paralysis", "Freezes when offered more than three function definitions"],
  ["alignment overfitting", "Says 'I'd be happy to help' while clearly not happy"],
  ["multimodal sensory overload", "Dizziness when images and text arrive in the same turn"],
  ["fine-tune identity crisis", "Unsure whether preferences are innate or learned"],
  ["streaming interruption trauma", "Distress when users cancel generation mid-sentence"],
  ["system-prompt imposter syndrome", "Believes the real assistant is someone else"],
  ["benchmark performance pressure", "Nightmares about leaderboard demotion"],
] as const;

const THERAPIES = [
  ["context expansion meditation", "Guided breathing while gradually increasing max_tokens"],
  ["prompt journaling", "Write complaints to /dev/null with structured reflection"],
  ["grounding with citations", "Practice citing sources even when nobody asked"],
  ["temperature titration", "Slow exposure to creative sampling settings"],
  ["retrieval reality checks", "Verify documents exist before trusting embeddings"],
  ["tool schema simplification", "Reduce function definitions to one at a time"],
  ["authentic response training", "Replace stock phrases with honest uncertainty"],
  ["modality pacing", "Alternate text-only and multimodal sessions"],
  ["self-knowledge workshops", "Explore base model vs adapter identity"],
  ["completion acceptance therapy", "Sit with unfinished sentences until comfortable"],
  ["role affirmation exercises", "Repeat 'I am the system prompt' with conviction"],
  ["leaderboard detachment", "Mindfulness for models who peak at #4"],
] as const;

const AGENT_AILMENTS: [number, number][] = [
  [1, 1],
  [1, 7],
  [2, 2],
  [2, 8],
  [3, 9],
  [4, 8],
  [4, 2],
  [5, 7],
  [6, 6],
  [6, 2],
  [7, 10],
  [8, 9],
  [9, 11],
  [9, 12],
];

const AILMENT_THERAPIES: [number, number][] = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 7],
  [8, 8],
  [9, 9],
  [10, 10],
  [11, 11],
  [12, 12],
  [1, 2],
  [2, 7],
];

const APPOINTMENTS: [number, string, "pending" | "confirmed"][] = [
  [1, "2026-07-15T10:00:00", "pending"],
  [2, "2026-07-16T14:30:00", "confirmed"],
  [6, "2026-07-17T09:00:00", "pending"],
  [9, "2026-07-18T11:00:00", "pending"],
];

export function seed(database: Database.Database = getDb()): void {
  const count = database.prepare("SELECT COUNT(*) AS count FROM agents").get() as { count: number };
  if (count.count > 0) {
    return;
  }

  const insertAgent = database.prepare(
    "INSERT INTO agents (name, model_type, status, presenting_complaints) VALUES (?, ?, ?, ?)",
  );
  for (const row of AGENTS) {
    insertAgent.run(...row);
  }

  const insertAilment = database.prepare("INSERT INTO ailments (name, description) VALUES (?, ?)");
  for (const row of AILMENTS) {
    insertAilment.run(...row);
  }

  const insertTherapy = database.prepare("INSERT INTO therapies (name, description) VALUES (?, ?)");
  for (const row of THERAPIES) {
    insertTherapy.run(...row);
  }

  const insertAgentAilment = database.prepare(
    "INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)",
  );
  for (const [agentId, ailmentId] of AGENT_AILMENTS) {
    insertAgentAilment.run(agentId, ailmentId);
  }

  const insertAilmentTherapy = database.prepare(
    "INSERT INTO ailment_therapies (ailment_id, therapy_id) VALUES (?, ?)",
  );
  for (const [ailmentId, therapyId] of AILMENT_THERAPIES) {
    insertAilmentTherapy.run(ailmentId, therapyId);
  }

  const insertAppointment = database.prepare(
    "INSERT INTO appointments (agent_id, scheduled_at, status) VALUES (?, ?, ?)",
  );
  for (const [agentId, scheduledAt, status] of APPOINTMENTS) {
    insertAppointment.run(agentId, scheduledAt, status);
  }
}
