import { Layout } from "../components/layout/Layout.js";
import { listTherapies } from "../repositories/therapies.js";

export function TherapiesList() {
  const therapies = listTherapies();

  return (
    <Layout currentPath="/therapies" title="Therapies — AgentClinic">
      <h1>Therapies</h1>
      <p>Evidence-based therapies matched to agent ailments.</p>
      <figure>
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">Therapy</th>
              <th scope="col">Description</th>
              <th scope="col">Addresses</th>
            </tr>
          </thead>
          <tbody>
            {therapies.map((therapy) => (
              <tr key={therapy.id}>
                <td>{therapy.name}</td>
                <td>{therapy.description}</td>
                <td>{therapy.ailments.join(", ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </Layout>
  );
}
