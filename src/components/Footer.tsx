"use client";
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from "react";
import Link from "next/link";
import { T } from "@/components/T";

export function Footer() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleLang = (lang: string) => {
    startTransition(() => router.replace(pathname.replace(`/${locale}`, `/${lang}`) || `/${lang}`));
  };

  return (
    <footer className="bg-foreground pt-24 pb-12 overflow-hidden text-background relative">
      <div className="absolute inset-0 bg-texture opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-20">
          <nav>
            <ul className="flex flex-wrap gap-8 font-bold text-white/50 uppercase tracking-[0.3em] text-[10px] md:text-xs font-sans">
              <li><Link href={`/${locale}/`} className="hover:text-primary transition-colors"><T>Inicio</T></Link></li>
              <li><Link href={`/${locale}/experiencias`} className="hover:text-primary transition-colors"><T>Catálogo</T></Link></li>
              <li><Link href={`/${locale}/#contacto`} className="hover:text-primary transition-colors"><T>Concierge</T></Link></li>
            </ul>
          </nav>
          <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] font-sans">
            <span className="text-white/30"><T>Idioma</T></span>
            <button onClick={() => handleLang('es')} className={`transition-colors ${locale === 'es' ? 'text-primary border-b border-primary pb-1' : 'text-white/50 hover:text-white'}`}>ES</button>
            <span className="text-white/30">/</span>
            <button onClick={() => handleLang('en')} className={`transition-colors ${locale === 'en' ? 'text-primary border-b border-primary pb-1' : 'text-white/50 hover:text-white'}`}>EN</button>
          </div>
        </div>

        {/* CORRECCIÓN: Tamaños estándar de Tailwind, sin vw. */}
        <div className="mb-20 flex flex-col justify-center items-center w-full">
          <h2 className="text-6xl md:text-8xl lg:text-9xl leading-none font-display font-bold text-white uppercase tracking-tight text-center break-words">
            EXPLORA<span className="text-primary">GO.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-xs font-sans text-white/40 pt-10 border-t border-white/10">
          <div className="space-y-3">
            <p className="font-bold tracking-[0.3em] uppercase text-white/60"><T>Sede Central</T></p>
            <p className="leading-relaxed">Ciudad de México, MX<br/>Redefiniendo el turismo gastronómico.</p>
          </div>
          <div className="space-y-3">
            <p className="font-bold tracking-[0.3em] uppercase text-white/60"><T>Transacciones</T></p>
            <p className="leading-relaxed">Visa, Mastercard<br/>Cifrado de extremo a extremo.</p>
          </div>
          <div className="flex flex-col gap-4 text-left md:text-right">
            <div className="flex gap-6 uppercase tracking-[0.2em] font-bold md:justify-end">
              <Link href={`/${locale}/aviso-de-privacidad`} className="hover:text-primary transition-colors"><T>Privacidad</T></Link>
              <Link href={`/${locale}/terminos`} className="hover:text-primary transition-colors"><T>Términos</T></Link>
            </div>
            <p>© {new Date().getFullYear()} Explorago. <T>Todos los derechos reservados.</T></p>
          </div>
        </div>

      </div>
    </footer>
  );
}