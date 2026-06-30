import { Layout } from "../components/layout/Layout.js";
import { formatScheduledAt } from "../lib/datetime.js";
import type { AppointmentWithAgent } from "../repositories/types.js";

type BookingConfirmationProps = {
  appointment: AppointmentWithAgent;
};

export function BookingConfirmation({ appointment }: BookingConfirmationProps) {
  return (
    <Layout currentPath="/agents" title="Booking confirmed — AgentClinic">
      <h1>Appointment booked</h1>
      <p>Your appointment has been scheduled and is awaiting confirmation.</p>
      <dl>
        <dt>Agent</dt>
        <dd>
          <a href={`/agents/${appointment.agent_id}`}>{appointment.agent_name}</a>
        </dd>
        <dt>Scheduled for</dt>
        <dd>{formatScheduledAt(appointment.scheduled_at)}</dd>
        <dt>Status</dt>
        <dd>{appointment.status}</dd>
      </dl>
      <p>
        <a href={`/agents/${appointment.agent_id}`}>Back to agent profile</a>
      </p>
    </Layout>
  );
}
