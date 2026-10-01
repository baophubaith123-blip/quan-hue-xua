// PageLayout.tsx — Khung trang 3 khe
import type { ReactNode } from 'react';
import './PageLayout.css';

interface PageLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  main: ReactNode;
}

export function PageLayout({ header, sidebar, main }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <header className="page-layout__header">{header}</header>
      <div className="page-layout__body">
        <aside className="page-layout__sidebar">{sidebar}</aside>
        <main className="page-layout__main">{main}</main>
      </div>
    </div>
  );
}