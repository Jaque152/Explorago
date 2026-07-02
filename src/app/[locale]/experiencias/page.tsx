"use client";
import { useLocale } from 'next-intl';
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; 
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from '@/lib/supabase';
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { Experience, SupabaseExperienceResponse } from "@/lib/types";
import { T } from "@/components/T";
import { useT } from "@/hooks/useT";

function ExperienciasContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categoria");
  const locale = useLocale();
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [searchTerm, setSearchTerm] = useState("");
  
  const phSearch = useT("Buscar región, ingrediente o ruta...");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: catData } = await supabase.from('categories_expgo').select('*');
        if (catData) setCategories(catData);

        const { data: actData } = await supabase
          .from('activities_expgo')
          .select(`
            id, title, slug, plan_type, destination, price, description, images, category_id,
            categories:categories_expgo (id, name, slug)
          `);

        if (actData) {
          const mappedData: Experience[] = (actData as unknown as SupabaseExperienceResponse[]).map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            plan_type: item.plan_type,
            destination: item.destination,
            price: item.price,
            currency: item.currency || 'MXN',
            tax_included: item.tax_included !== false,
            description: item.description || "",
            images: item.images || [], 
            category_id: item.category_id,
            categories: item.categories || undefined,
            suggested_route: [],
            included: [],
            logistics: {}
          }));
          setExperiences(mappedData);
        }
      } catch (error) {
        console.error("Error fetchData:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCategory = !selectedCategory || exp.categories?.slug === selectedCategory;
    const matchesSearch = !searchTerm ||
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat("es-MX", {
      style: "currency", currency: "MXN", minimumFractionDigits: 0,
    });
    return `${formatter.format(price)} MXN`;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 relative">
      <div className="absolute inset-0 bg-texture mix-blend-multiply opacity-20 pointer-events-none" />
      <Header />
      
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row pt-32 pb-32">
        
        {/* =========================================================
            NUEVA ESTRUCTURA 1: SIDEBAR FIJO (Índice del Menú)
            ========================================================= */}
        <aside className="w-full lg:w-1/3 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] pr-0 lg:pr-12 flex flex-col justify-between mb-16 lg:mb-0">
          
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/50 border-b border-foreground/10 pb-4 mb-8 block w-full">
              <T>La Colección</T>
            </span>
            <h1 className="text-6xl font-display font-bold tracking-tight text-foreground uppercase leading-[0.85] mb-12">
              <T>Origen &</T><br/>
              <span className="font-serif italic text-primary font-normal lowercase tracking-normal"><T>sabor.</T></span>
            </h1>

            {/* Navegación Vertical Minimalista */}
            <nav className="flex flex-col gap-6 w-full mt-12">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-left text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-4 ${!selectedCategory ? 'text-primary' : 'text-foreground/40 hover:text-foreground'}`}
              >
                {!selectedCategory && <span className="w-4 h-[2px] bg-primary block" />}
                <T>Menú Completo</T>
              </button>
              
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`text-left text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-4 ${selectedCategory === cat.slug ? 'text-primary' : 'text-foreground/40 hover:text-foreground'}`}
                >
                  {selectedCategory === cat.slug && <span className="w-4 h-[2px] bg-primary block" />}
                  <T>{cat.name}</T>
                </button>
              ))}
            </nav>
          </div>

          <div className="relative w-full mt-16 lg:mt-0">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              placeholder={phSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 h-10 border-0 border-b border-foreground/20 focus-visible:ring-0 focus-visible:border-primary focus:outline-none rounded-none bg-transparent font-sans text-foreground placeholder:text-foreground/40 text-sm"
            />
          </div>
        </aside>

        {/* =========================================================
            NUEVA ESTRUCTURA 2: FLUJO EDITORIAL (Adiós a las Tarjetas)
            ========================================================= */}
        <section className="w-full lg:w-2/3 lg:pl-12 lg:border-l border-foreground/10">
          
          {filteredExperiences.length === 0 ? (
            <div className="text-center py-32 border border-foreground/10 p-12">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4 uppercase tracking-tight"><T>Mesa no disponible</T></h3>
              <p className="text-muted-foreground font-sans"><T>Intenta ajustando los filtros de tu búsqueda.</T></p>
            </div>
          ) : (
            <div className="flex flex-col gap-24 lg:gap-32 pt-8 lg:pt-0">
              {filteredExperiences.map((exp, index) => {
                const thumbImage = exp.images?.length > 0 ? exp.images[0] : '/placeholder.jpg';

                return (
                  <Link key={exp.id} href={`/${locale}/experiencias/${exp.id}`} className="group block">
                    <article className="flex flex-col w-full">
                      
                      {/* Imagen Masiva Formato Paisaje */}
                      <div className="w-full aspect-[16/9] md:aspect-[21/9] relative overflow-hidden mb-8 bg-foreground/5">
                        <Image 
                          src={thumbImage} 
                          alt={exp.title} 
                          fill
                          sizes="(max-width: 1200px) 100vw, 66vw"
                          className="object-cover scale-100 group-hover:scale-105 grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000" 
                        />
                        {/* Etiqueta Flotante */}
                        <div className="absolute top-0 right-0 bg-background text-foreground text-[10px] font-bold px-4 py-3 uppercase tracking-[0.2em]">
                          <T>{exp.plan_type}</T>
                        </div>
                      </div>

                      {/* Texto Descriptivo Debajo (Estilo Artículo) */}
                      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="w-full md:w-2/3">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4 block">
                            <T>{exp.destination}</T>
                          </span>
                          <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-foreground mb-6 leading-[0.9] group-hover:text-primary transition-colors">
                            <T>{exp.title}</T>
                          </h3>
                          <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed line-clamp-3">
                            <T>{exp.description}</T>
                          </p>
                        </div>

                        <div className="w-full md:w-1/3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end md:text-right border-t md:border-t-0 md:border-l border-foreground/10 pt-6 md:pt-0 pl-0 md:pl-8">
                          <div className="mb-0 md:mb-8">
                            <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-2"><T>IVA Incluido</T></span>
                            <span className="text-xl font-sans font-bold text-foreground">{formatPrice(exp.price)}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs font-bold text-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                            <T>Explorar</T> <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default function ExperienciasPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    }>
      <ExperienciasContent />
    </Suspense>
  );
}