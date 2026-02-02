import { MapPin, Sparkles, Timer } from 'lucide-react';

import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const highlights = [
  {
    title: 'Cupos reales en minutos',
    description: 'Busca espacios con disponibilidad validada y confirma tu lugar antes de salir.',
    icon: Timer,
  },
  {
    title: 'Pagos QR locales',
    description: 'Paga con tu app bancaria favorita y recibe confirmacion inmediata.',
    icon: Sparkles,
  },
  {
    title: 'Negocios verificados',
    description: 'Perfiles con horarios, reglas y precios claros para decidir mejor.',
    icon: MapPin,
  },
];

export default function Home() {
  return (
    <AppShell>
      <div className="flex flex-col gap-10">
        <section className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground">
              Bienestar inteligente para tu ciudad
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground">
              Reserva saunas, piscinas y espacios de relax con cupos garantizados.
            </h1>
            <p className="text-base text-muted-foreground">
              WellPlace conecta personas y negocios locales con informacion verificada, pagos QR y
              confirmaciones rapidas. Menos friccion, mas bienestar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button data-testid="home_primary_cta">Buscar espacios</Button>
              <Button variant="outline" data-testid="home_secondary_cta">
                Ver como funciona
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold text-muted-foreground">Panel rapido</p>
              <div className="grid gap-4">
                <div className="rounded-2xl bg-white/80 p-4">
                  <p className="text-sm font-semibold">Hoy en Cochabamba</p>
                  <p className="text-xs text-muted-foreground">12 negocios con cupos abiertos</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4">
                  <p className="text-sm font-semibold">Reservas activas</p>
                  <p className="text-xs text-muted-foreground">Confirmadas en menos de 5 min</p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4">
                  <p className="text-sm font-semibold">Pago QR local</p>
                  <p className="text-xs text-muted-foreground">Sin tarjetas internacionales</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map(item => (
            <Card key={item.title}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="px-0">
                  Conocer mas
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
