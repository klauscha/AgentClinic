import { Layout } from "../components/layout/Layout.js";
import { formatScheduledAt } from "../lib/datetime.js";
import {
  getDashboardStats,
  listAgentsForDashboard,
  listAilmentsForDashboard,
  listRecentAppointments,
} from "../repositories/dashboard.js";

export function Dashboard() {
  const stats = getDashboardStats();
  const appointments = listRecentAppointments();
  const agents = listAgentsForDashboard();
  const ailments = listAilmentsForDashboard();

  return (
    <Layout currentPath="/dashboard" title="Dashboard — AgentClinic">
      <h1>Staff dashboard</h1>
      <p>Mary&apos;s overview of AgentClinic operations.</p>

      <div class="grid">
        <article>
          <header>Agents</header>
          <p>
            <strong>{stats.agentCount}</strong> registered
          </p>
        </article>
        <article>
          <header>Open appointments</header>
          <p>
            <strong>{stats.pendingAppointments}</strong> pending
          </p>
        </article>
        <article>
          <header>Ailments in-flight</header>
          <p>
            <strong>{stats.agentsWithAilments}</strong> agents with ailments
          </p>
        </article>
      </div>

      <h2>Recent appointments</h2>
      <figure>
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">Agent</th>
              <th scope="col">Scheduled</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>
                  <a href={`/agents/${appointment.agent_id}`}>{appointment.agent_name}</a>
                </td>
                <td>{formatScheduledAt(appointment.scheduled_at)}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <h2>Agents</h2>
      <figure>
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Model type</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td>
                  <a href={`/agents/${agent.id}`}>{agent.name}</a>
                </td>
                <td>{agent.model_type}</td>
                <td>{agent.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <h2>Ailments overview</h2>
      <figure>
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">Ailment</th>
              <th scope="col">Agents affected</th>
            </tr>
          </thead>
          <tbody>
            {ailments.map((ailment) => (
              <tr key={ailment.id}>
                <td>{ailment.name}</td>
                <td>{ailment.agent_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </Layout>
  );
}
