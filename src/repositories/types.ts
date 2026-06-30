export type Agent = {
  id: number;
  name: string;
  model_type: string;
  status: string;
  presenting_complaints: string;
};

export type Ailment = {
  id: number;
  name: string;
  description: string;
};

export type Therapy = {
  id: number;
  name: string;
  description: string;
};

export type Appointment = {
  id: number;
  agent_id: number;
  scheduled_at: string;
  status: "pending" | "confirmed";
  created_at: string;
};

export type AilmentWithAgentCount = Ailment & {
  agent_count: number;
};

export type TherapyWithAilments = Therapy & {
  ailments: string[];
};

export type AppointmentWithAgent = Appointment & {
  agent_name: string;
};
