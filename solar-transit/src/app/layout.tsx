import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Solar Transit — Commercial Spaceflight Booking",
  description: "Reserve civilian journeys across the solar system.",
};

import AuthProvider from '../components/AuthProvider';
import Providers from '../components/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}