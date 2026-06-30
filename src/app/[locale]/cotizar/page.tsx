"use client";
import { useLocale } from 'next-intl';
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { T } from "@/components/T";
import { useT } from "@/hooks/useT";
import { Loader2, ArrowRight, MapPin, Calendar, Users, Wallet, MessageSquare, User, Sparkles, AlertCircle } from "lucide-react";
import { supabase } from '@/lib/supabase';

const BUDGET_OPTIONS = [
  "Menos de $10,000 MXN",
  "$10,000 - $25,000 MXN",
  "$25,000 - $50,000 MXN",
  "$50,000 - $100,000 MXN",
  "Más de $100,000 MXN",
];

function TranslatedOption({ value }: { value: string }) {
  const translatedText = useT(value);
  return <option value={value} className="font-medium text-foreground">{translatedText}</option>;
}

export default function CotizarPage() {
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    destination: "", startDate: "", travelers: 2, budget: "", requirements: "", firstName: "", lastName: "", email: "", phone: "",
  });

  const phDestination = useT("Ej: Oaxaca, Riviera Maya...");
  const phRequirements = useT("¿Qué expectativas o experiencias tienes en mente?");
  const phFirstName = useT("Nombre");
  const phLastName = useT("Apellidos");
  const phEmail = useT("Correo electrónico");
  const phPhone = useT("Teléfono de contacto");
  const phSelectRange = useT("Selecciona un rango estimado");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const customer_name = `${formData.firstName} ${formData.lastName}`.trim();
      
      try {
        const { error: dbError } = await supabase.from('custom_quotes_expgo').insert([{
            customer_name: customer_name, customer_email: formData.email, phone: formData.phone, destination: formData.destination,
            start_date: formData.startDate, pax_qty: formData.travelers, budget: formData.budget,
            special_requests: formData.requirements, status: 'pending'
        }]);
        if (dbError) console.error("Advertencia BD Cotización:", dbError.message);
      } catch(e) {
        console.error("Fallo al guardar en base de datos, procediendo con envío de correo.");
      }

      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'QUOTE', 
          locale: locale,
          email: formData.email, 
          phone: formData.phone,
          customerName: customer_name, 
          destination: formData.destination,
          budget: formData.budget, 
          startDate: formData.startDate, 
          travelers: formData.travelers, 
          message: formData.requirements || (locale === 'en' ? "Custom itinerary request." : "Solicitud de itinerario personalizado.")
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Fallo al enviar correo");
      }

      setShowSuccess(true);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Error desconocido';
      console.error("🔥 Detalle exacto del error:", error);
      setErrorMessage(locale === 'en' ? `Could not send request: ${msg}` : `No se pudo enviar la cotización: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.destination && formData.startDate && formData.email && formData.firstName && formData.phone;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const inputClass = "h-14 border-0 border-b-2 border-foreground/10 bg-transparent focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 font-medium text-lg text-foreground placeholder:text-foreground/30 transition-colors w-full";
  const labelClass = "text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2 flex items-center gap-2";

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
        <Header />
        <main className="flex-1 pt-40 pb-24 flex items-center justify-center px-6">
          <div className="max-w-2xl w-full bg-white rounded-none p-12 lg:p-16 text-center shadow-2xl border border-border/50 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/20">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight mb-6 text-foreground"><T>¡Visión Recibida!</T></h1>
            <p className="text-muted-foreground font-sans mb-12 text-lg leading-relaxed">
              <T>Hola</T> <strong className="text-foreground font-bold">{formData.firstName}</strong>, <T>hemos enviado un correo a</T> <strong className="text-foreground font-bold">{formData.email}</strong> <T>confirmando tu solicitud. Nuestro equipo de diseño de rutas ya está trabajando en tu itinerario.</T>
            </p>
            <Link href={`/${locale}/`} className="inline-flex items-center justify-center w-full h-16 rounded-none bg-foreground text-background font-bold tracking-[0.2em] uppercase hover:bg-primary transition-colors text-xs group shadow-xl">
              <T>Volver al Inicio</T>
              <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      <main className="flex-1 pt-32 pb-32">
        <section className="container mx-auto px-6 lg:px-12 max-w-screen-xl mb-16 pt-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-[1px] w-8 bg-primary"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/60">
                <T>Diseño de Ruta</T>
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-foreground mb-6 leading-[0.9] uppercase">
              <T>Crea tu viaje</T><br/>
              <span className="font-serif italic normal-case text-primary font-normal tracking-normal"><T>a la medida.</T></span>
            </h1>
            <p className="text-lg text-muted-foreground font-sans max-w-xl leading-relaxed">
              <T>Comparte tu visión con nosotros. Nuestros expertos orquestarán un itinerario exclusivo donde cada detalle lleve tu firma, sin fricciones ni paquetes genéricos.</T>
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-16">
              <div className="bg-transparent border-t border-foreground/10 pt-10">
                <h2 className="text-2xl font-display font-bold uppercase text-foreground mb-10 flex items-center gap-3 tracking-tight">
                  <div className="p-2 bg-primary/10 rounded-none border border-primary/20"><MapPin className="w-5 h-5 text-primary" /></div>
                  <T>Proyección de la Ruta</T>
                </h2>
                
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="md:col-span-2 group">
                    <label className={labelClass}><T>¿A dónde deseas viajar? *</T></label>
                    <Input value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} placeholder={phDestination} required className={inputClass} />
                  </div>
                  <div className="group">
                    <label className={labelClass}><Calendar className="w-4 h-4 text-primary" /> <T>Fecha de Inicio *</T></label>
                    <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} min={minDateStr} required className={inputClass} />
                  </div>
                  <div className="group">
                    <label className={labelClass}><Users className="w-4 h-4 text-primary" /> <T>Viajeros</T></label>
                    <Input type="number" value={formData.travelers} onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })} min={1} className={inputClass} />
                  </div>
                  <div className="md:col-span-2 group">
                    <label className={labelClass}><Wallet className="w-4 h-4 text-primary" /> <T>Presupuesto Estimado</T></label>
                    <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={`${inputClass} cursor-pointer appearance-none`}>
                      <option value="" disabled className="text-foreground/30">{phSelectRange}</option>
                      {BUDGET_OPTIONS.map((o) => <TranslatedOption key={o} value={o} />)}
                    </select>
                  </div>
                  <div className="md:col-span-2 mt-4 group">
                    <label className={labelClass}><MessageSquare className="w-4 h-4 text-primary" /> <T>Requerimientos Especiales</T></label>
                    <Textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} placeholder={phRequirements} rows={4} className="bg-transparent border-0 border-b-2 border-foreground/10 min-h-[120px] font-medium text-lg text-foreground focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 py-4 resize-none transition-colors placeholder:text-foreground/30 w-full" />
                  </div>
                </div>
              </div>

              <div className="bg-transparent border-t border-foreground/10 pt-10">
                <h2 className="text-2xl font-display font-bold uppercase text-foreground mb-10 flex items-center gap-3 tracking-tight">
                  <div className="p-2 bg-primary/10 rounded-none border border-primary/20"><User className="w-5 h-5 text-primary" /></div>
                  <T>Datos del Titular</T>
                </h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="group">
                    <Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder={phFirstName} required className={inputClass} />
                  </div>
                  <div className="group">
                    <Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder={phLastName} className={inputClass} />
                  </div>
                  <div className="group">
                    <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={phEmail} required className={inputClass} />
                  </div>
                  <div className="group">
                    <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder={phPhone} required className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-foreground rounded-none p-8 lg:p-10 shadow-2xl text-background border border-white/10 relative">
                <div className="absolute inset-0 bg-texture mix-blend-overlay opacity-30 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold uppercase mb-6 tracking-tight"><T>Siguiente Paso</T></h3>
                  <p className="text-background/60 font-sans text-sm leading-relaxed mb-10">
                    <T>Al enviar esta solicitud, nuestro equipo de diseño de rutas se pondrá en contacto contigo en menos de 24 horas con una propuesta preliminar adaptada a tus necesidades.</T>
                  </p>
                  
                  {/* MENSAJE DE ERROR INTEGRADO */}
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 mb-8 text-sm font-sans flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="whitespace-pre-wrap leading-relaxed">{errorMessage}</p>
                    </div>
                  )}

                  <button type="submit" disabled={!isFormValid || isSubmitting} className="w-full h-16 rounded-none bg-primary hover:bg-white text-white hover:text-foreground font-bold tracking-[0.2em] uppercase text-xs transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl group">
                    {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : null}
                    <span>{isSubmitting ? <T>Enviando...</T> : <T>Solicitar Diseño</T>}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>

                  <div className="mt-10 pt-8 border-t border-background/20 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-background/40 mb-4">
                      <T>¿Ya tienes una propuesta?</T>
                    </p>
                    <Link href={`/${locale}/pago-folio`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">
                      <T>Liquidar Folio Asignado</T> <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}