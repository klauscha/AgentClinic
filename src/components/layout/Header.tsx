import { Nav } from "./Nav.js";
import type { HeaderProps } from "./types.js";

export function Header({ currentPath }: HeaderProps) {
  return (
    <header class="container">
      <nav aria-label="Main">
        <ul>
          <li>
            <a href="/">
              <strong>AgentClinic</strong>
            </a>
          </li>
        </ul>
        <Nav currentPath={currentPath} />
      </nav>
    </header>
  );
}
