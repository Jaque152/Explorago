"use client";
import { useLocale } from 'next-intl';
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { T } from "@/components/T";

export function Pricing() {
  const locale = useLocale();

  const benefits = [
    {
      title: "Cero paquetes prefabricados",
      description: "Diseño de ruta inteligente que se adapta a tu paladar, restricciones y ritmo."
    },
    {
      title: "Culinaria sin filtros",
      description: "Del mejor taco de callejón hasta la mesa del chef con estrella Michelin. Sin trampas para turistas."
    },
    {
      title: "Concierge Dedicado",
      description: "Un asesor experto local monitoreando tus reservaciones y logística en tiempo real."
    },
    {
      title: "Transparencia Total",
      description: "Sin tarifas ocultas. Estructura de costos clara desde el diseño de tu menú de viaje."
    }
  ];

  return (
    <section id="precios" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-texture mix-blend-multiply opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="relative w-full h-[50vh] lg:h-[70vh]">
            <div className="absolute inset-0 bg-primary/10 translate-x-4 -translate-y-4" />
            <img 
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop" 
              alt="La Firma Explorago" 
              className="relative z-10 w-full h-full object-cover grayscale-[30%]"
            />
            <div className="absolute -bottom-6 -right-6 bg-foreground text-background p-8 z-20 shadow-2xl hidden md:block">
              <span className="font-serif italic text-2xl text-primary"><T>Nuestra Filosofía.</T></span>
            </div>
          </div>

          <div className="flex flex-col">
            {/* TEXTO CONTENIDO Y SEGURO: Tamaños estándar y font-bold */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-foreground mb-8 break-words leading-none">
              <T>La Firma</T><br/>
              <span className="text-primary"><T>Explorago.</T></span>
            </h2>
            
            <p className="text-lg text-muted-foreground font-sans mb-12 max-w-lg">
              <T>Elevamos el estándar. No vendemos boletos ni empaquetamos destinos; curamos y orquestamos cada aspecto de tu viaje para que tu única preocupación sea disfrutar el sabor de México.</T>
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 mb-12">
              {benefits.map((item, i) => (
                <div key={i} className="flex flex-col gap-3 pr-4">
                  <div className="w-8 h-[2px] bg-secondary mb-2" />
                  <h3 className="text-lg font-display font-bold uppercase text-foreground leading-tight">
                    <T>{item.title}</T>
                  </h3>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                    <T>{item.description}</T>
                  </p>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/cotizar`} className="inline-flex items-center justify-center gap-4 text-xs font-bold text-background bg-foreground hover:bg-primary transition-colors uppercase tracking-[0.2em] px-10 py-5 w-full sm:w-fit">
              <T>Iniciar Diseño de Ruta</T>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}