import type { PropsWithChildren } from "hono/jsx";

export function Main({ children }: PropsWithChildren) {
  return <main class="site-main">{children}</main>;
}
