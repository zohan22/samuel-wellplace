import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Ingresa a WellPlace</CardTitle>
          <CardDescription>
            Accede para gestionar tus reservas y descubrir nuevos espacios.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                placeholder="tu@email.com"
                type="email"
                data-testid="login_email_input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contrasena</Label>
              <Input
                id="password"
                placeholder="Tu clave"
                type="password"
                data-testid="login_password_input"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" data-testid="login_remember_checkbox" />
              <Label htmlFor="remember">Recordarme</Label>
            </div>
            <Link href="#" className="text-xs text-primary">
              Olvidaste tu clave?
            </Link>
          </div>
          <Button data-testid="login_submit_button">Ingresar</Button>
          <p className="text-center text-xs text-muted-foreground">
            No tienes cuenta?{' '}
            <Link href="/signup" className="text-primary">
              Crear cuenta
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
