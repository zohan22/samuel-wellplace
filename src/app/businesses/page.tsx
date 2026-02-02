import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AppShell } from '@/components/layout/app-shell';
import type { Business } from '@/lib/types';

const businesses: Business[] = [
  {
    id: '1',
    owner_id: 'owner-1',
    name: 'Aqua Serena',
    description: 'Piscina familiar con area verde, snacks y duchas privadas.',
    status: 'active',
    phone: '+59171000011',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    owner_id: 'owner-2',
    name: 'Sauna Bosque',
    description: 'Cabinas privadas, sauna seco y vapor para grupos medianos.',
    status: 'active',
    phone: '+59171000012',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    owner_id: 'owner-3',
    name: 'Centro Andino',
    description: 'Spa urbano con masajes express y zonas de relax.',
    status: 'active',
    phone: '+59171000013',
    created_at: new Date().toISOString(),
  },
];

export default function BusinessesPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Negocios disponibles</h2>
          <p className="text-sm text-muted-foreground">
            Filtra por ciudad, precio y disponibilidad para elegir tu proximo plan.
          </p>
        </header>

        <div className="grid gap-4 rounded-3xl border border-border bg-card p-5 md:grid-cols-[1fr,180px,180px,auto]">
          <Input placeholder="Busca por nombre o servicio" data-testid="business_search_input" />
          <Select>
            <SelectTrigger data-testid="business_city_select">
              <SelectValue placeholder="Ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cbba">Cochabamba</SelectItem>
              <SelectItem value="lpz">La Paz</SelectItem>
              <SelectItem value="scz">Santa Cruz</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger data-testid="business_people_select">
              <SelectValue placeholder="Personas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 personas</SelectItem>
              <SelectItem value="4">4 personas</SelectItem>
              <SelectItem value="6">6 personas</SelectItem>
            </SelectContent>
          </Select>
          <Button data-testid="business_filter_button">Filtrar</Button>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {businesses.map(business => (
            <Card key={business.id} className="transition hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{business.name}</CardTitle>
                  <Badge variant="secondary">Disponible</Badge>
                </div>
                <CardDescription>{business.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Contacto</p>
                  <p className="text-sm font-semibold">{business.phone}</p>
                </div>
                <Button variant="outline" data-testid="business_card_cta">
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
