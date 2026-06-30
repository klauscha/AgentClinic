import type { MainProps } from "./types.js";

export function Main({ children }: MainProps) {
  return <main class="container">{children}</main>;
}
