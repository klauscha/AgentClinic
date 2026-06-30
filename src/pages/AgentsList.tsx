import { Layout } from "../components/layout/Layout.js";
import { listAgents } from "../repositories/agents.js";

export function AgentsList() {
  const agents = listAgents();

  return (
    <Layout currentPath="/agents" title="Agents — AgentClinic">
      <h1>Agents</h1>
      <p>Agents seeking support at AgentClinic.</p>
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
    </Layout>
  );
}
