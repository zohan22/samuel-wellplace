import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crea tu cuenta en WellPlace</CardTitle>
          <CardDescription>
            Reserva espacios con cupo garantizado y paga con QR local.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                placeholder="Tu nombre"
                type="text"
                data-testid="signup_name_input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                placeholder="tu@email.com"
                type="email"
                data-testid="signup_email_input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contrasena</Label>
              <Input
                id="password"
                placeholder="Crea una clave"
                type="password"
                data-testid="signup_password_input"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="terms" data-testid="signup_terms_checkbox" />
            <Label htmlFor="terms">Acepto los terminos y condiciones</Label>
          </div>
          <Button data-testid="signup_submit_button">Crear cuenta</Button>
          <p className="text-center text-xs text-muted-foreground">
            Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary">
              Ingresar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
