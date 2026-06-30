"use client";
import { useLocale } from 'next-intl';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import { FifaExp } from "@/lib/types";
import { T } from "@/components/T";

export function FifaSection() {
  const [fifaExps, setFifaExps] = useState<FifaExp[]>([]);
  const [activeExpId, setActiveExpId] = useState<number | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function loadFifaData() {
      // Apuntando a la nueva tabla de Explorago
      const { data, error } = await supabase
        .from('fifa_experiences_expgo')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) {
        console.error("Error al cargar experiencias FIFA:", error);
      }

      if (data && data.length > 0) {
        setFifaExps(data);
        setActiveExpId(data[0].id); 
      }
    }
    loadFifaData();
  }, []);

  const activeExp = fifaExps.find(exp => exp.id === activeExpId);

  return (
    <section className="relative min-h-screen flex items-center py-24 lg:py-40 bg-foreground text-background overflow-hidden border-t border-white/5">
      
      {/* Textura cruda global para mantener la identidad */}
      <div className="absolute inset-0 bg-texture mix-blend-overlay opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* =========================================================
              LADO IZQUIERDO: Índice Editorial
              ========================================================= */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center lg:sticky lg:top-32">
            
            {/* Tag / Etiqueta */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-10">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
                <T>Acceso Reservado</T>
              </span>
            </div>
            
            {/* Título Monumental */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight text-white mb-16 leading-[0.85]">
              <T>El mundo</T><br/>
              <span className="text-primary"><T>mira.</T></span><br/>
              <span className="font-serif italic text-white/40 normal-case tracking-normal text-5xl md:text-6xl lg:text-7xl"><T>Tú lo vives.</T></span>
            </h2>

            {/* Menú Interactivo (Estilo Tabla de Contenidos) */}
            <div className="flex flex-col border-t border-white/10">
              {fifaExps.map((exp, i) => (
                <button 
                  key={exp.id}
                  onClick={() => setActiveExpId(exp.id)} 
                  className="group flex items-center justify-between py-6 md:py-8 border-b border-white/10 text-left transition-all hover:border-primary"
                >
                  <div className="flex items-center gap-6 md:gap-8">
                    <span className={`text-3xl md:text-4xl font-serif italic transition-colors ${activeExpId === exp.id ? 'text-primary' : 'text-white/20 group-hover:text-white/50'}`}>
                      0{i + 1}
                    </span>
                    <span className={`text-lg md:text-xl font-display font-bold uppercase tracking-wide transition-colors ${activeExpId === exp.id ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                      <T>{exp.title}</T>
                    </span>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${activeExpId === exp.id ? 'text-primary opacity-100 translate-x-0' : 'text-white/20 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </button>
              ))}
            </div>

          </div>

          {/* =========================================================
              LADO DERECHO: Dossier de la Experiencia
              ========================================================= */}
          <div className="w-full lg:w-7/12 relative">
            {activeExp && (
              <div 
                key={activeExp.id} 
                className="bg-white/5 border border-white/10 p-3 md:p-4 animate-fade-in shadow-2xl"
              >
                {/* Cuadro Fotográfico Crudo */}
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-black mb-8 border border-white/5">
                  <img 
                    src={activeExp.image_url} 
                    alt={activeExp.title} 
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 scale-100 hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Contenido Editorial */}
                <div className="px-4 pb-6 md:px-10 md:pb-10">
                  <h3 className="text-3xl md:text-4xl font-display font-bold uppercase text-white mb-6 tracking-tight">
                    <T>{activeExp.subtitle}</T>
                  </h3>
                  
                  <p className="text-white/70 font-sans text-base md:text-lg leading-relaxed mb-10 border-l-2 border-primary pl-6 py-2 italic">
                    <T>{activeExp.description}</T>
                  </p>
                  
                  <div className="mb-12">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-6 block">
                      <T>Beneficios Exclusivos</T>
                    </span>
                    <ul className="flex flex-col gap-0">
                      {activeExp.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-5 border-t border-white/10 py-5 group">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                          <span className="text-sm md:text-base font-sans text-white/80 group-hover:text-white transition-colors">
                            <T>{item}</T>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Cero Bordes */}
                  <Button asChild className="w-full rounded-none bg-primary text-white hover:bg-white hover:text-foreground font-bold h-16 uppercase tracking-[0.2em] text-xs transition-colors shadow-lg">
                    <Link href={`/${locale}/cotizar`}>
                      <T>Solicitar Acceso</T> <ArrowRight className="ml-4 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}