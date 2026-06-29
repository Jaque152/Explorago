"use client";
import { MoveDown } from "lucide-react";
import { useLocale } from 'next-intl';
import { T } from "@/components/T";

export function Hero() {
  const locale = useLocale();

  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-black">
      
      {/* Fondo Inmersivo */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=2071&auto=format&fit=crop" 
          alt="Turismo Gastronómico México" 
          className="w-full h-full object-cover scale-105"
          style={{ animation: 'zoomOut 25s ease-out forwards' }}
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90" />
        <div className="absolute inset-0 bg-texture mix-blend-overlay opacity-30" />
      </div>

      <style jsx>{`
        @keyframes zoomOut {
          0% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Contenido Seguro y Centrado */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col items-center justify-center h-full pt-16">
        
        <div className="mb-6 md:mb-8">
          <span className="block text-xs font-bold text-white/70 tracking-[0.4em] uppercase text-center drop-shadow-md animate-fade-in">
            <T>Turismo de Alto Nivel</T>
          </span>
        </div>
        
        <div className="flex flex-col items-center text-center w-full">
          <h1 className="text-white text-7xl sm:text-8xl md:text-9xl font-display font-bold uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] leading-none tracking-tight animate-fade-in">
            EXPLORA
          </h1>
          <h1 className="text-primary text-7xl sm:text-8xl md:text-9xl font-display font-bold uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] leading-none tracking-tight animate-fade-in mt-2">
            GO<span className="text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]">.</span>
          </h1>
        </div>

        <div className="mt-10 md:mt-12">
          <p className="font-serif italic text-white/90 text-xl md:text-2xl text-center drop-shadow-lg animate-fade-in">
            <T>Una expedición al corazón culinario de México.</T>
          </p>
        </div>

      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-white/60 hover:text-white transition-colors cursor-pointer">
        <a href="#experiencias" className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]"><T>Descubre</T></span>
          <MoveDown className="w-5 h-5 animate-bounce drop-shadow-md" strokeWidth={1.5} />
        </a>
      </div>

    </section>
  );
}