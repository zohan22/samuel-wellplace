import type { ReactNode } from 'react';

import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';

export const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen p-6">
    <div className="grid gap-6 lg:grid-cols-[auto,1fr]">
      <Sidebar />
      <div className="flex flex-col gap-6">
        <Navbar />
        <main className="flex-1 rounded-3xl border border-border bg-white/70 p-8 shadow-soft">
          {children}
        </main>
      </div>
    </div>
  </div>
);
