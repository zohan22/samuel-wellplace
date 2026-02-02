'use client';

import Link from 'next/link';
import { Menu, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { href: '/businesses', label: 'Negocios' },
  { href: '/login', label: 'Ingresar' },
  { href: '/signup', label: 'Crear cuenta' },
];

export const Navbar = () => (
  <header className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-card/80 px-6 py-4 shadow-card backdrop-blur">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Sparkles className="h-5 w-5" />
      </div>
      <div>
        <p className="text-lg font-semibold">WellPlace</p>
        <p className="text-xs text-muted-foreground">Bienestar reservado a tu ritmo</p>
      </div>
    </div>
    <nav className="hidden items-center gap-6 md:flex">
      {navItems.map(item => (
        <Link key={item.href} href={item.href} className="text-sm text-muted-foreground">
          {item.label}
        </Link>
      ))}
      <Button data-testid="navbar_primary_cta">Reservar ahora</Button>
    </nav>
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" data-testid="navbar_menu_button">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-4">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="text-sm text-muted-foreground">
                {item.label}
              </Link>
            ))}
            <Button data-testid="navbar_primary_cta_mobile">Reservar ahora</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </header>
);
