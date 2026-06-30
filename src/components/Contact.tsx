"use client";
import { T } from "@/components/T";
import { useState } from "react";
import { ArrowRight, Loader2, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLocale } from 'next-intl';

export function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // 1. Intentar guardar en Base de Datos
      try {
        const { error: dbError } = await supabase.from("contact_messages_expgo").insert([{ 
          full_name: formData.name, 
          email: formData.email, 
          phone: formData.phone, 
          message: formData.message 
        }]);
        if (dbError) console.error("Advertencia BD:", dbError.message);
      } catch (e) {
        console.error("Fallo al guardar en base de datos, procediendo con envío de correo.");
      }
      
      // 2. Enviar el correo electrónico vía API
      const res = await fetch("/api/send", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          type: "CONTACT", 
          locale: locale, 
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }) 
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Fallo en la API de correos");
      }

      setSubmitStatus('success');
      setFormData({ name: "", phone: "", email: "", message: "" });
      
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error de red o servidor.";
      console.error("🔥 Error de envío:", msg);
      setErrorMessage(locale === 'en' ? `We couldn't send your message: ${msg}` : `No pudimos enviar tu mensaje: ${msg}`);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative bg-foreground py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row bg-background shadow-2xl overflow-hidden">
          
          {/* LADO IZQUIERDO: Imagen */}
          <div className="w-full lg:w-5/12 relative min-h-[40vh]">
            <img 
              src="https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?q=80&w=2000&auto=format&fit=crop" 
              alt="Mesa de Autor" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40 mix-blend-multiply" />
            <div className="absolute bottom-10 left-10 right-10">
              <span className="font-serif italic text-3xl text-white drop-shadow-md"><T>Tu mesa está lista.</T></span>
            </div>
          </div>

          {/* LADO DERECHO: Área de Formulario / Mensaje */}
          <div className="w-full lg:w-7/12 p-10 lg:p-20 relative bg-texture">
            
            {submitStatus === 'success' ? (
              // PANTALLA DE ÉXITO ELEGANTE
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700 py-10">
                <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold uppercase text-foreground mb-4 tracking-tight">
                  <T>¡Visión Recibida!</T>
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed mb-10 max-w-md">
                  <T>Hemos recibido tu mensaje con éxito. Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo en breve.</T>
                </p>
                <button 
                  onClick={() => setSubmitStatus('idle')} 
                  className="text-xs font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors border-b border-primary hover:border-foreground pb-1"
                >
                  <T>Enviar otro mensaje</T>
                </button>
              </div>
            ) : (
              // FORMULARIO DE CONTACTO
              <div className="animate-in fade-in duration-500">
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground mb-4">
                    <T>Inicia tu travesía.</T>
                  </h2>
                  <p className="text-muted-foreground font-sans">
                    <T>Comparte los primeros trazos de tu viaje. Nuestro equipo trazará una propuesta en menos de 24 horas.</T>
                  </p>
                  <a href="mailto:atencion@explorago.com.mx" className="inline-block mt-4 text-sm font-bold text-primary uppercase tracking-[0.2em] hover:text-foreground transition-colors">
                    atencion@explorago.com.mx
                  </a>
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-5 mb-8 text-sm font-sans flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="whitespace-pre-wrap leading-relaxed">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col border-b border-foreground/20 focus-within:border-primary transition-colors">
                      <label className="text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-1"><T>Nombre</T></label>
                      <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-transparent font-sans text-foreground pb-2 outline-none w-full" placeholder={locale === 'en' ? 'Your full name' : 'Tu nombre completo'} />
                    </div>
                    <div className="flex flex-col border-b border-foreground/20 focus-within:border-primary transition-colors">
                      <label className="text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-1"><T>Teléfono</T></label>
                      <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-transparent font-sans text-foreground pb-2 outline-none w-full" placeholder="+52" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col border-b border-foreground/20 focus-within:border-primary transition-colors">
                    <label className="text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-1"><T>Correo Electrónico</T></label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-transparent font-sans text-foreground pb-2 outline-none w-full" placeholder="ejemplo@correo.com" />
                  </div>

                  <div className="flex flex-col border-b border-foreground/20 focus-within:border-primary transition-colors relative">
                    <label className="text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] mb-1"><T>Visión del Viaje</T></label>
                    <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} maxLength={180} rows={3} className="bg-transparent font-sans text-foreground pb-2 outline-none resize-none w-full" placeholder={locale === 'en' ? 'Tell us about your expectations...' : 'Cuéntanos tus expectativas...'} />
                    <span className="absolute bottom-2 right-0 text-[10px] text-foreground/30">{formData.message.length}/180</span>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-foreground text-background font-bold text-xs uppercase tracking-[0.2em] px-12 py-5 flex items-center justify-center gap-3 hover:bg-primary transition-colors disabled:opacity-50 mt-6 shadow-xl">
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <T>Enviar Solicitud</T>}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}