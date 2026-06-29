"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Experience } from "@/lib/types"; 
import { T } from "@/components/T";
import { useT } from "@/hooks/useT";
import { useLocale } from 'next-intl';
import { Check, Minus, Plus, Loader2, MapPin, Clock, ArrowRight } from "lucide-react";

// ============================================================================
// WIDGET DE RESERVA (Flotante y Elegante)
// ============================================================================
interface WidgetProps {
  experience: Experience;
  selectedDate: string;
  setSelectedDate: (val: string) => void;
  people: number;
  setPeople: (val: number) => void;
  customDestination: string;
  setCustomDestination: (val: string) => void;
  isAdding: boolean;
  handleAddToCart: () => void;
  formatPrice: (price: number) => string;
  isPersonalized: boolean;
  phDestino: string;
}

const BookingWidget = ({
  experience, selectedDate, setSelectedDate, people, setPeople, 
  customDestination, setCustomDestination, isAdding, handleAddToCart, formatPrice, isPersonalized, phDestino
}: WidgetProps) => {
  const minDateStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <div className="bg-foreground text-background shadow-2xl relative sticky top-32">
      <div className="absolute inset-0 bg-texture mix-blend-overlay opacity-30 pointer-events-none" />
      
      <div className="p-8 lg:p-10 relative z-10 flex flex-col h-full">
        
        {/* Precio */}
        <div className="mb-10">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] block mb-2">
            <T>Inversión por persona</T>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight">{formatPrice(experience.price)}</span>
          </div>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2 block">
            <T>Impuestos Incluidos</T>
          </span>
        </div>

        {/* Formulario */}
        <div className="space-y-8 flex-1">
          
          {isPersonalized && (
            <div className="flex flex-col border-b border-white/20 pb-2 focus-within:border-primary transition-colors">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2"><T>Destino Específico</T></label>
              <input 
                type="text" 
                value={customDestination} 
                onChange={(e) => setCustomDestination(e.target.value)} 
                placeholder={phDestino}
                className="w-full bg-transparent font-sans text-white border-none focus:outline-none placeholder:text-white/20 text-sm" 
              />
            </div>
          )}

          <div className="flex flex-col border-b border-white/20 pb-2 focus-within:border-primary transition-colors">
            <label className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2"><T>Fecha de Inicio</T></label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
              min={minDateStr} 
              className="w-full bg-transparent font-sans text-white border-none focus:outline-none color-scheme-dark text-sm" 
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4"><T>Viajeros</T></label>
            <div className="flex items-center justify-between border border-white/20 h-14 bg-white/5">
              <button type="button" className="h-full w-14 flex items-center justify-center hover:bg-white/10 text-white transition-colors" onClick={() => setPeople(Math.max(1, people - 1))}><Minus className="w-4 h-4"/></button>
              <span className="font-sans font-bold text-xl text-white">{people}</span>
              <button type="button" className="h-full w-14 flex items-center justify-center hover:bg-white/10 text-white transition-colors" onClick={() => setPeople(people + 1)}><Plus className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        {/* Botón */}
        <button 
          type="button"
          className="w-full bg-primary hover:bg-white text-white hover:text-foreground font-bold h-16 uppercase tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-3 disabled:opacity-50 mt-10"
          onClick={handleAddToCart}
          disabled={!selectedDate || isAdding || (isPersonalized && !customDestination.trim())}
        >
          {isAdding ? <Loader2 className="animate-spin w-4 h-4" /> : null}
          {isAdding ? <T>Integrando...</T> : <T>Asegurar Espacio</T>}
          {!isAdding && <ArrowRight className="w-4 h-4" />}
        </button>

      </div>
    </div>
  );
};

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================
export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const { addToCart } = useCart();
  const phDestino = useT("Ej. Oaxaca, Los Cabos, Tulum...");

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedDate, setSelectedDate] = useState("");
  const [people, setPeople] = useState(1);
  const [customDestination, setCustomDestination] = useState(""); 
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadFullDetail() {
      if (!params.id) return;
      setLoading(true);
      try {
        const { data: activity } = await supabase
          .from('activities_expgo')
          .select('*, categories:categories_expgo(name, slug)')
          .eq('id', params.id)
          .single();
        if (activity) setExperience(activity as Experience);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadFullDetail();
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(price);
  };

  const isPersonalized = experience?.plan_type === 'PERSONALIZADA';

  const handleAddToCart = () => {
    if (!experience || !selectedDate) return;
    if (isPersonalized && !customDestination.trim()) return;

    setIsAdding(true);
    const experienceToCart = isPersonalized ? { ...experience, destination: customDestination } : experience;

    addToCart({
      activityId: experience.id,
      experience: experienceToCart,
      date: selectedDate,
      people: people,
      pricePerPerson: Number(experience.price),
    });

    setTimeout(() => {
      setIsAdding(false);
      router.push(`/${locale}/carrito`);
    }, 500);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
    </div>
  );

  if (!experience) return null;

  const mainImage = experience.images?.length > 0 ? experience.images[0] : '/placeholder.jpg';

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 relative">
      <div className="absolute inset-0 bg-texture mix-blend-multiply opacity-20 pointer-events-none" />
      <Header />
      
      <main className="flex-1 pt-40 pb-32 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          
          {/* =========================================================
              ENCABEZADO EDITORIAL (Sin imágenes de fondo)
              ========================================================= */}
          <header className="mb-12 max-w-4xl">
            <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-6 border-b border-primary pb-2">
              <T>{experience.plan_type}</T>
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight text-foreground leading-[0.9] mb-8 break-words">
              <T>{experience.title}</T>
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 text-xs font-bold text-foreground/50 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> 
                {isPersonalized && customDestination ? customDestination : <T>{experience.destination}</T>}
              </div>
              {experience.logistics?.duracion_estimada && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> 
                  <T>{experience.logistics.duracion_estimada}</T>
                </div>
              )}
            </div>
          </header>

          {/* =========================================================
              FOTOGRAFÍA PANORÁMICA CORTADA (Cine)
              ========================================================= */}
          <figure className="w-full aspect-video md:aspect-[21/9] overflow-hidden bg-foreground/5 mb-16 lg:mb-24 shadow-sm border border-foreground/10">
            <img 
              src={mainImage} 
              alt={experience.title} 
              className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-1000 grayscale-[10%] hover:grayscale-0" 
            />
          </figure>

          {/* =========================================================
              CUERPO DE LECTURA Y WIDGET (Grid Asimétrico)
              ========================================================= */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* LADO IZQUIERDO: Narrativa y Tiempos */}
            <div className="lg:col-span-7 space-y-20 w-full">
              
              {/* Descripción (Con Letra Capitular) */}
              <section>
                <h2 className="text-sm font-bold text-foreground/40 uppercase tracking-[0.3em] mb-6"><T>La Experiencia</T></h2>
                <p className="text-foreground/80 font-sans leading-relaxed text-lg whitespace-pre-wrap">
                  <span className="float-left text-6xl font-serif italic text-primary leading-none pr-3 pt-2">
                    {experience.description?.charAt(0)}
                  </span>
                  <T>{experience.description?.slice(1)}</T>
                </p>
              </section>

              {/* El Recorrido (Menú de Tiempos) */}
              {experience.suggested_route && experience.suggested_route.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold text-foreground/40 uppercase tracking-[0.3em] mb-10"><T>Itinerario Sugerido</T></h2>
                  <div className="grid gap-8">
                    {experience.suggested_route.map((step, i) => (
                      <div key={i} className="flex gap-6 items-start group">
                        <span className="text-2xl font-serif italic text-foreground/30 group-hover:text-primary transition-colors leading-none mt-1 shrink-0">
                          0{i + 1}.
                        </span>
                        <p className="text-foreground/80 font-sans text-base leading-relaxed pb-6 border-b border-foreground/10 w-full"><T>{step}</T></p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Inclusiones e Información Técnica */}
              <section className="grid sm:grid-cols-2 gap-12 bg-white/40 p-8 border border-foreground/10">
                {/* Incluye */}
                {experience.included && experience.included.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold uppercase text-primary tracking-[0.2em] mb-6"><T>Incluye</T></h3>
                    <ul className="space-y-4">
                      {experience.included.map((inc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5"/> 
                          <span className="text-sm font-sans text-foreground/80 leading-snug"><T>{inc}</T></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* No incluye */}
                {experience.logistics?.no_incluye && experience.logistics.no_incluye.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold uppercase text-foreground/40 tracking-[0.2em] mb-6"><T>A Considerar</T></h3>
                    <ul className="space-y-4">
                      {experience.logistics.no_incluye.map((noInc, i) => (
                        <li key={i} className="flex items-start gap-3 opacity-70">
                          <Minus className="w-4 h-4 text-foreground/30 shrink-0 mt-0.5"/> 
                          <span className="text-sm font-sans text-foreground/70 leading-snug"><T>{noInc}</T></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

            </div>

            {/* LADO DERECHO: Terminal de Reserva */}
            <aside className="lg:col-span-5 w-full">
              <BookingWidget 
                experience={experience} selectedDate={selectedDate} setSelectedDate={setSelectedDate} people={people} setPeople={setPeople}
                customDestination={customDestination} setCustomDestination={setCustomDestination}
                isAdding={isAdding} handleAddToCart={handleAddToCart} formatPrice={formatPrice} isPersonalized={isPersonalized} phDestino={phDestino}
              />
            </aside>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}