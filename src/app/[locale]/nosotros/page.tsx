"use client";

import { useLocale } from 'next-intl';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { T } from "@/components/T";

export default function SobreNosotrosPage() {
  const locale = useLocale();

  // FAQ Completamente parafraseado con un tono de alta gama y servicio premium
  const faqs = [
    {
      q: "¿Cuál es la dinámica para apartar mi lugar?",
      a: "Escoge la vivencia que más resuene contigo y contáctanos. En menos de 24 horas te entregaremos un itinerario a la medida y el acceso seguro para procesar tu reserva de forma inmediata."
    },
    {
      q: "¿Qué contempla exactamente mi inversión?",
      a: "Garantizamos una experiencia sin fricciones: anfitriones expertos, degustaciones acordadas, accesos a recintos, movilidad interna y contribuciones fiscales. Las tarifas están expresadas en pesos mexicanos (IVA incluido). El alojamiento y vuelos se cotizan aparte, salvo en expediciones extendidas."
    },
    {
      q: "¿Orquestan recorridos para círculos íntimos o corporativos?",
      a: "Totalmente. Diseñamos itinerarios confidenciales para parejas, familias o equipos de trabajo. Comparte tu visión y estructuraremos una jornada exclusiva, respetando tus fechas y nivel de privacidad."
    },
    {
      q: "¿Qué métodos de pago manejan y cuál es su política de cancelación?",
      a: "Procesamos pagos vía transferencia, Visa y Mastercard. Podrás recuperar el 100% de tu inversión si cancelas con un mes de anticipación, o el 50% entre 14 y 30 días previos. Por logística de ingredientes y reservas, no hay reembolsos con menos de dos semanas de aviso, salvo emergencias médicas comprobables."
    },
    {
      q: "¿Las travesías están disponibles en idiomas extranjeros?",
      a: "La esencia de nuestros recorridos se narra en español. No obstante, disponemos de intérpretes y guías bilingües (inglés/español) para invitados internacionales; solo te pedimos indicarlo al solicitar tu expedición."
    },
    {
      q: "¿Cómo abordan las alergias o regímenes alimenticios particulares?",
      a: "Con absoluta seriedad. Adaptamos nuestras degustaciones para comensales veganos, celíacos o con cualquier requerimiento específico. Avísanos con antelación para que nuestras cocineras tradicionales preparen los insumos adecuados."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />

      <main className="flex-1">

        {/* ==========================================
            SECCIÓN 1: INTRODUCCIÓN EDITORIAL
            ========================================== */}
        <section className="pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 lg:px-12 max-w-screen-2xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-texture mix-blend-multiply opacity-20 pointer-events-none" />

          {/* Layout Asimétrico de Revista */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-center relative z-10">
            
            {/* Texto Desfasado a la Izquierda */}
            <div className="w-full lg:w-5/12 lg:pr-12 lg:-mt-24 z-20">
              <span className="text-xs font-bold text-foreground/50 tracking-[0.4em] uppercase mb-8 block">
                <T>Nuestra Esencia</T>
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight text-foreground mb-8 leading-[0.85] break-words">
                <T>La cocina</T><br/>
                <span className="font-serif italic text-primary font-normal lowercase tracking-normal"><T>que respira.</T></span>
              </h1>
              <div className="w-16 h-[2px] bg-secondary mb-8" />
              <p className="text-xl md:text-2xl font-serif italic text-muted-foreground leading-relaxed">
                <T>Lejos de los reflectores, el verdadero lujo es probar el fruto de una tierra que ha sido trabajada con respeto.</T>
              </p>
            </div>

            {/* Imagen Principal a la Derecha */}
            <div className="w-full lg:w-7/12 relative">
              <div className="absolute inset-0 bg-primary/5 translate-x-6 translate-y-6" />
              <img
                src="https://images.unsplash.com/photo-1564767655658-4d6af1657802?q=80&w=2000&auto=format&fit=crop"
                alt="Cocina de origen"
                className="relative z-10 w-full h-[50vh] lg:h-[75vh] object-cover grayscale-[15%]"
              />
              
              {/* Bloque de texto superpuesto sobre la imagen */}
              <div className="relative lg:absolute lg:-bottom-12 lg:-left-24 z-30 bg-background border border-foreground/10 p-8 md:p-12 shadow-2xl max-w-xl mt-8 lg:mt-0">
                <p className="text-foreground/80 font-sans text-sm md:text-base leading-relaxed mb-6">
                  <T>Fundamos este proyecto con una convicción inquebrantable: la identidad gastronómica de México no reside en los menús prefabricados, sino en las manos de quienes muelen el maíz, cultivan el agave y avivan la leña.</T>
                </p>
                <p className="text-foreground/80 font-sans text-sm md:text-base leading-relaxed">
                  <T>Tejemos redes directas con familias, agricultores y maestros artesanos. Cada expedición está diseñada para inyectar valor directo a sus comunidades, convirtiendo tu viaje en una forma honesta y profunda de honrar nuestras raíces.</T>
                </p>
                <span className="block mt-8 text-xs font-bold text-primary uppercase tracking-widest">
                  <T>El Equipo Explorago</T>
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            SECCIÓN 2: FAQ (Estilo Menú / Guía del Viajero)
            ========================================== */}
        <section className="py-24 lg:py-40 bg-foreground text-background relative border-t border-white/5 mt-12 lg:mt-24">
          <div className="absolute inset-0 bg-texture mix-blend-overlay opacity-30 pointer-events-none" />

          <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl relative z-10">

            {/* Cabecera FAQ reescrita */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 border-b border-white/10 pb-12">
              <div className="max-w-2xl">
                <span className="block text-xs font-bold text-white/40 tracking-[0.4em] uppercase mb-6">
                  <T>Guía del Viajero</T>
                </span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight text-white leading-none">
                  <T>Claridad</T><br/>
                  <span className="text-primary"><T>Absoluta.</T></span>
                </h2>
              </div>
              <div className="max-w-sm pb-2">
                <p className="font-serif italic text-white/60 text-lg md:text-xl">
                  <T>Respuestas precisas para que inicies tu travesía con total tranquilidad y certeza.</T>
                </p>
              </div>
            </div>

            {/* Lista Editorial de Preguntas (Adiós al Grid) */}
            <div className="flex flex-col max-w-4xl mx-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-b border-white/10 group hover:border-primary transition-colors">
                  
                  {/* Número Gigante y Elegante */}
                  <div className="md:w-1/6 shrink-0">
                    <span className="text-4xl md:text-5xl font-serif italic text-white/20 group-hover:text-primary transition-colors">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Pregunta y Respuesta */}
                  <div className="md:w-5/6 flex flex-col gap-4">
                    <h3 className="text-2xl md:text-3xl font-display font-bold uppercase text-white tracking-tight">
                      <T>{faq.q}</T>
                    </h3>
                    <p className="text-white/60 font-sans text-base leading-relaxed group-hover:text-white/80 transition-colors">
                      <T>{faq.a}</T>
                    </p>
                  </div>
                  
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}