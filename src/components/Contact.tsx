"use client";
import { T } from "@/components/T";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLocale } from 'next-intl';

export function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages_expgo").insert([{ full_name: formData.name, email: formData.email, phone: formData.phone, message: formData.message }]);
      if (error) throw error;
      const res = await fetch("/api/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "CONTACT", ...formData, customerName: formData.name }) });
      if (!res.ok) throw new Error("Fallo envío");
      alert(locale === 'en' ? "Message sent successfully!" : "¡Mensaje enviado con éxito!");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      alert(locale === 'en' ? "Error sending your message." : "Hubo un error al enviar tu mensaje.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative bg-foreground py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row bg-background shadow-2xl overflow-hidden">
          
          {/* Imagen Decorativa */}
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

          {/* Formulario */}
          <div className="w-full lg:w-7/12 p-10 lg:p-20 relative bg-texture">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-foreground mb-4">
                <T>Inicia tu travesía.</T>
              </h2>
              <p className="text-muted-foreground font-sans">
                <T>Comparte los primeros trazos de tu viaje. Nuestro equipo trazará una propuesta en menos de 24 horas.</T>
              </p>
              <a href="mailto:atencion@explorago.com.mx" className="inline-block mt-4 text-sm font-bold text-primary uppercase tracking-[0.2em] hover:text-foreground transition-colors">
                atencion@explorago.com.mx
              </a>
            </div>

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

              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-foreground text-background font-bold text-xs uppercase tracking-[0.2em] px-12 py-5 flex items-center justify-center gap-3 hover:bg-primary transition-colors disabled:opacity-50 mt-6">
                {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <T>Enviar Solicitud</T>}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}