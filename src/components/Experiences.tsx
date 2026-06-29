"use client";
import { useLocale } from 'next-intl';
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { T } from "@/components/T";

const categoryCards = [
  {
    id: 1,
    number: "01",
    title: "Talleres y Mercados",
    description: "Inmersiones de medio día. Sumérgete en los pasillos de los mercados más auténticos, selecciona ingredientes locales y cocina en fogones tradicionales junto a mayoras y artesanos.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2000&auto=format&fit=crop", 
    tag: "Descubrimiento de Raíz",
    slug: "talleres-mercados" // Coincide con el slug de la BD
  },
  {
    id: 2,
    number: "02",
    title: "Rutas Regionales",
    description: "Travesías de uno o varios días para comprender la identidad de un estado a través de su paladar. Desde la ruta de los siete moles en Oaxaca hasta la cocina del Mayab en Yucatán.",
    image: "https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?q=80&w=2000&auto=format&fit=crop", 
    tag: "Inmersión Total",
    slug: "rutas-regionales" // Coincide con el slug de la BD
  },
  {
    id: 3,
    number: "03",
    title: "Enología y Café",
    description: "Expediciones dedicadas al arte líquido. Recorre los cafetales de altura en Veracruz y Oaxaca, o degusta perfiles aromáticos en las exclusivas casas boutique del Valle de Guadalupe.",
    image: "https://images.pexels.com/photos/17331983/pexels-photo-17331983.jpeg?q=80&w=2000&auto=format&fit=crop", 
    tag: "Catas y Origen",
    // Redirigimos a rutas-vino-queso, pero abarcará visualmente ambas categorías de bebidas
    slug: "rutas-vino-queso" 
  }
];

export function Experiences() {
  const locale = useLocale();
  return (
    <section id="experiencias" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-texture mix-blend-multiply opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl relative z-10">
        
        {/* ==========================================
            BLOQUE 1: EL PROCESO (Explorago)
            ========================================== */}
        <div className="mb-32">
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-foreground/10 pb-12">
            <div className="max-w-2xl">
              <span className="block text-xs font-bold text-foreground/50 tracking-[0.4em] uppercase mb-6">
                <T>Nuestra Metodología</T>
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-foreground leading-[0.9]">
                <T>Tu viaje con</T><br/>
                <span className="text-primary"><T>Explorago.</T></span>
              </h2>
            </div>
            <div className="max-w-md pb-2">
              <p className="font-serif italic text-muted-foreground text-xl md:text-2xl">
                <T>Tres etapas para crear un recorrido personalizado, de la mano de los verdaderos guardianes de la gastronomía de México.</T>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Paso 1 */}
            <div className="flex flex-col gap-4 group">
              <span className="text-5xl font-serif italic text-foreground/20 group-hover:text-primary transition-colors">01</span>
              <h3 className="text-2xl font-display font-bold text-foreground uppercase mt-2"><T>Descubre</T></h3>
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest"><T>Selecciona tu travesía</T></h4>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mt-2">
                <T>Navega por expediciones clasificadas por zona, época del año y nivel de profundidad. Desde una mañana entre los pasillos de un mercado tradicional hasta siete días recorriendo haciendas históricas.</T>
              </p>
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col gap-4 group">
              <span className="text-5xl font-serif italic text-foreground/20 group-hover:text-primary transition-colors">02</span>
              <h3 className="text-2xl font-display font-bold text-foreground uppercase mt-2"><T>Personaliza</T></h3>
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest"><T>Creamos tu itinerario</T></h4>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mt-2">
                <T>Un experto local adaptará el calendario, tus preferencias culinarias y el ritmo del viaje. Nos encargamos de la logística, el alojamiento y de abrirte las puertas de los hogares de nuestros productores.</T>
              </p>
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col gap-4 group">
              <span className="text-5xl font-serif italic text-foreground/20 group-hover:text-primary transition-colors">03</span>
              <h3 className="text-2xl font-display font-bold text-foreground uppercase mt-2"><T>Experimenta</T></h3>
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest"><T>Saborea México</T></h4>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mt-2">
                <T>Comparte jornadas completas con mayoras, locatarios y artesanos. Regresarás a casa con secretos culinarios, nuevas amistades y una comprensión profunda de nuestra herencia gastronómica.</T>
              </p>
            </div>

          </div>
        </div>

        {/* ==========================================
            BLOQUE 2: CATÁLOGO (Líneas de Sabor)
            ========================================== */}
        <div className="pt-20 border-t border-foreground/10">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-foreground">
              <T>Líneas de</T> <span className="font-serif italic text-primary font-normal lowercase tracking-normal"><T>sabor.</T></span>
            </h2>
            <Link href={`/${locale}/experiencias`} className="hidden md:flex items-center gap-3 text-primary font-bold hover:text-foreground transition-colors uppercase tracking-[0.2em] text-xs pb-2 border-b-2 border-primary hover:border-foreground">
              <T>Ver menú completo</T> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-24 md:gap-32">
            {categoryCards.map((cat, index) => (
              <div key={cat.id} className={`flex flex-col gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-primary/10 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
                  <Link href={`/${locale}/experiencias?categoria=${cat.slug}`}>
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="relative z-10 w-full h-[500px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </Link>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center px-0 md:px-12 xl:px-24">
                  <span className="text-secondary font-display text-lg md:text-2xl mb-4 block">
                    {cat.number}
                  </span>
                  <span className="text-[10px] font-bold text-foreground/50 tracking-[0.4em] uppercase mb-6 block">
                    <T>{cat.tag}</T>
                  </span>
                  <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 uppercase tracking-tight">
                    <T>{cat.title}</T>
                  </h3>
                  <p className="text-lg text-muted-foreground font-sans leading-relaxed mb-10">
                    <T>{cat.description}</T>
                  </p>
                  <Link href={`/${locale}/experiencias?categoria=${cat.slug}`} className="inline-flex items-center gap-3 text-sm font-bold text-primary uppercase tracking-[0.2em] hover:gap-5 transition-all">
                    <T>Explorar</T> <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}