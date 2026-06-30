import { Layout } from "../components/layout/Layout.js";
import { getAgentById, getAilmentsForAgent } from "../repositories/agents.js";

type AgentDetailProps = {
  agentId: number;
  bookingError?: string;
};

export function AgentDetail({ agentId, bookingError }: AgentDetailProps) {
  const agent = getAgentById(agentId)!;
  const ailments = getAilmentsForAgent(agent.id);

  return (
    <Layout currentPath="/agents" title={`${agent.name} — AgentClinic`}>
      <h1>{agent.name}</h1>
      <dl>
        <dt>Model type</dt>
        <dd>{agent.model_type}</dd>
        <dt>Status</dt>
        <dd>{agent.status}</dd>
        <dt>Presenting complaints</dt>
        <dd>{agent.presenting_complaints}</dd>
      </dl>

      <h2>Ailments</h2>
      {ailments.length > 0 ? (
        <ul>
          {ailments.map((ailment) => (
            <li key={ailment.id}>
              <a href="/ailments">{ailment.name}</a> — {ailment.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No ailments on file.</p>
      )}

      <h2>Book an appointment</h2>
      {bookingError ? (
        <p role="alert">
          <strong>{bookingError}</strong>
        </p>
      ) : null}
      <form method="post" action={`/agents/${agent.id}/book`}>
        <label>
          Appointment time
          <input type="datetime-local" name="scheduled_at" required />
        </label>
        <button type="submit">Book appointment</button>
      </form>
      <p>
        <a href="/agents">Back to agents</a>
      </p>
    </Layout>
  );
}
