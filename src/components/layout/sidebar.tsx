'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Compass, LayoutGrid, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navigation = [
  { href: '/', label: 'Inicio', icon: LayoutGrid },
  { href: '/businesses', label: 'Negocios', icon: Compass },
  { href: '/login', label: 'Reservas', icon: Calendar },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <aside
        className={`flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/80 p-5 shadow-card backdrop-blur transition-all ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">Explora</p>
              <p className="text-xs text-muted-foreground">Panel principal</p>
            </div>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCollapsed(current => !current)}
            data-testid="sidebar_toggle"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {navigation.map(item => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted ${
                      collapsed ? 'justify-center' : ''
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            );
          })}
        </div>
      </aside>
    </TooltipProvider>
  );
};
