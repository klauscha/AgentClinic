import { Nav } from "./Nav.js";
import type { HeaderProps } from "./types.js";

export function Header({ currentPath }: HeaderProps) {
  return (
    <header class="container">
      <nav aria-label="Main">
        <ul>
          <li>
            <h1>AgentClinic</h1>
          </li>
        </ul>
        <Nav currentPath={currentPath} />
      </nav>
    </header>
  );
}
