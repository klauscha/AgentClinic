import type { NavProps } from "./types.js";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/agents", label: "Agents" },
] as const;

export function Nav({ currentPath }: NavProps) {
  return (
    <ul>
      {NAV_LINKS.map(({ href, label }) => (
        <li key={href}>
          <a href={href} aria-current={currentPath === href ? "page" : undefined}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
