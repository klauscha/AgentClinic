import type { PropsWithChildren } from "hono/jsx";

export type CurrentPathProps = {
  currentPath: string;
};

export type NavProps = CurrentPathProps;

export type HeaderProps = CurrentPathProps;

export type LayoutProps = PropsWithChildren<
  CurrentPathProps & {
    title: string;
  }
>;

export type MainProps = PropsWithChildren;
