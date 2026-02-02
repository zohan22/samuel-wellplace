import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

import { AuthProvider } from '@/contexts/auth-context';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WellPlace',
  description: 'Descubre espacios de bienestar y reserva en minutos.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.className} app-gradient`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
