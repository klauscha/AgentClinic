import { layoutCssHref, picoCssHref } from "../../styles/index.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { Main } from "./Main.js";
import type { LayoutProps } from "./types.js";

export function Layout({ children, currentPath, title }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <title>{title}</title>
        <link rel="stylesheet" href={picoCssHref} />
        <link rel="stylesheet" href={layoutCssHref} />
      </head>
      <body>
        <Header currentPath={currentPath} />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
