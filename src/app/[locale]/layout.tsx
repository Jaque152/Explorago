import "../globals.css";
import { ClientBody } from "@/app/ClientBody";
import { ReactNode } from "react";
import type { Metadata } from "next";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Explorago | Turismo Gastronómico de Alto Nivel",
  description: "Descubre el auténtico sabor de México. Recorridos culinarios, inmersión cultural y experiencias de autor.",
};

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <html lang={locale}>
      {/* Aplicamos la textura orgánica al body desde el inicio */}
      <ClientBody locale={locale}>
        <div className="bg-texture min-h-screen">
          {children}
        </div>
      </ClientBody>
    </html>
  );
}