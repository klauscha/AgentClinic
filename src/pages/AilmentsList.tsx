import { Layout } from "../components/layout/Layout.js";
import { listAilments } from "../repositories/ailments.js";

export function AilmentsList() {
  const ailments = listAilments();

  return (
    <Layout currentPath="/ailments" title="Ailments — AgentClinic">
      <h1>Ailments</h1>
      <p>Common conditions affecting AI agents at AgentClinic.</p>
      <figure>
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">Ailment</th>
              <th scope="col">Description</th>
              <th scope="col">Agents affected</th>
            </tr>
          </thead>
          <tbody>
            {ailments.map((ailment) => (
              <tr key={ailment.id}>
                <td>{ailment.name}</td>
                <td>{ailment.description}</td>
                <td>{ailment.agent_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </Layout>
  );
}
