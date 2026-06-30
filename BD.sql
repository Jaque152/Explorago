-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================================================
-- 1. LIMPIEZA PREVIA (Borramos todo el historial de la BD)
-- =====================================================================================
DROP TABLE IF EXISTS public.booking_items_expgo CASCADE;
DROP TABLE IF EXISTS public.cart_items_expgo CASCADE;
DROP TABLE IF EXISTS public.bookings_expgo CASCADE;
DROP TABLE IF EXISTS public.activity_packages_expgo CASCADE;
DROP TABLE IF EXISTS public.activities_expgo CASCADE;
DROP TABLE IF EXISTS public.categories_expgo CASCADE;
DROP TABLE IF EXISTS public.customers_expgo CASCADE;
DROP TABLE IF EXISTS public.contact_messages_expgo CASCADE;
DROP TABLE IF EXISTS public.custom_quotes_expgo CASCADE;
DROP TABLE IF EXISTS public.fifa_experiences_expgo CASCADE;

-- =====================================================================================
-- 2. CREACIÓN DE TABLAS
-- =====================================================================================
CREATE TABLE public.categories_expgo (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE
);

CREATE TABLE public.activities_expgo (
  id SERIAL PRIMARY KEY,
  slug VARCHAR NOT NULL UNIQUE, 
  title VARCHAR NOT NULL,
  plan_type VARCHAR NOT NULL, 
  destination VARCHAR NOT NULL,
  price NUMERIC NOT NULL,
  currency VARCHAR DEFAULT 'MXN',
  tax_included BOOLEAN DEFAULT true,
  description TEXT,
  suggested_route JSONB DEFAULT '[]'::jsonb, 
  included JSONB DEFAULT '[]'::jsonb, 
  logistics JSONB DEFAULT '{}'::jsonb, 
  category_id INTEGER REFERENCES public.categories_expgo(id),
  images JSONB DEFAULT '[]'::jsonb, 
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.customers_expgo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  phone VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.custom_quotes_expgo (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR NOT NULL,
  customer_email VARCHAR NOT NULL,
  phone VARCHAR,
  destination VARCHAR,
  pax_qty INTEGER,
  budget VARCHAR,
  special_requests TEXT,
  start_date DATE,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.contact_messages_expgo (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR,
  phone VARCHAR,
  email VARCHAR,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cart_items_expgo (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR NOT NULL,
  activity_id INTEGER REFERENCES public.activities_expgo(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  pax_qty INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.bookings_expgo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.customers_expgo(id),
  session_id VARCHAR, 
  total_amount NUMERIC NOT NULL,
  payment_status VARCHAR DEFAULT 'pending',
  transaction_id VARCHAR,
  payment_provider VARCHAR,
  payment_date TIMESTAMPTZ,
  pais VARCHAR,
  direccion TEXT,
  localidad VARCHAR,
  estado VARCHAR,
  codigo_postal VARCHAR,
  order_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.booking_items_expgo (
  id SERIAL PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings_expgo(id),
  activity_id INTEGER REFERENCES public.activities_expgo(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  pax_qty INTEGER DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  custom_destination VARCHAR
);

CREATE TABLE public.fifa_experiences_expgo (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  subtitle VARCHAR,
  description TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  order_index INTEGER DEFAULT 0
);

-- =====================================================================================
-- 3. POLÍTICAS DE SEGURIDAD RLS
-- =====================================================================================
ALTER TABLE public.categories_expgo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities_expgo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fifa_experiences_expgo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers_expgo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings_expgo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items_expgo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_quotes_expgo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública catálogos" ON public.categories_expgo FOR SELECT USING (true);
CREATE POLICY "Lectura pública actividades" ON public.activities_expgo FOR SELECT USING (true);
CREATE POLICY "Lectura pública fifa" ON public.fifa_experiences_expgo FOR SELECT USING (true);
CREATE POLICY "Acceso total a clientes en checkout" ON public.customers_expgo FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total a reservas en checkout" ON public.bookings_expgo FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total a items de reserva" ON public.booking_items_expgo FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir inserción anónima cotizaciones" ON public.custom_quotes_expgo FOR INSERT WITH CHECK (true);

-- =====================================================================================
-- 4. INSERTAR CATEGORÍAS (Las 4 del Catálogo TasteMex)
-- =====================================================================================
INSERT INTO public.categories_expgo (name, slug) VALUES 
('Talleres de Cocina y Mercados', 'talleres-mercados'),
('Rutas Gastronómicas Regionales', 'rutas-regionales'),
('Rutas de Café', 'rutas-cafe'),
('Rutas de Vino y Queso', 'rutas-vino-queso');

-- =====================================================================================
-- 5. MIGRACIÓN DEL CATÁLOGO DE RUTAS GASTRONÓMICAS
-- =====================================================================================
INSERT INTO public.activities_expgo (slug, title, plan_type, destination, price, currency, tax_included, description, included, logistics, category_id, images) VALUES

-- CATEGORÍA 1: TALLERES DE COCINA Y MERCADOS (ID 1)
('cocina-tradicional-cuetzalan', 'Cocina Tradicional en Cuetzalan', 'TALLER', 'Puebla', 2800.00, 'MXN', true, 
'Cuetzalan, en la Sierra Norte de Puebla, conserva una de las tradiciones gastronómicas más auténticas de la región. Entre calles cubiertas de neblina, mercados locales y cocinas de leña, esta experiencia permite conocer técnicas y recetas heredadas durante generaciones dentro de la cultura nahua. Inicia con un recorrido por el mercado y tianguis tradicional, posteriormente se preparan platillos típicos como tlayoyos rellenos de alverjón, y el proceso artesanal de tostado y molienda de café regional.', 
'["Recorrido guiado por mercado tradicional", "Taller de cocina tradicional nahua", "Preparación de platillos regionales", "Comida tradicional", "Café tostado y molido (250 g para llevar)"]'::jsonb, 
'{"no_incluye": ["Hospedaje en Cuetzalan", "Compras personales", "Propinas", "Servicios no especificados"]}'::jsonb, 1,
'["https://images.unsplash.com/photo-1674290844001-006bd2a9c51c?q=80&w=1018&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2000&auto=format&fit=crop"]'::jsonb),

('cocina-mixteca-huajuapan', 'Cocina Tradicional Mixteca', 'TALLER', 'Oaxaca', 8690.00, 'MXN', true, 
'La cocina mixteca es una de las tradiciones gastronómicas más antiguas y menos exploradas de México. En Huajuapan de León, sobreviven recetas, ingredientes y técnicas ancestrales. Recorreremos mercados y productores locales para conocer chiles costeños, maíz criollo y quesos regionales. Después, en cocina tradicional, prepararemos tortillas mixtecas a mano, tasajo enchilado y caldo de gato.', 
'["Recomendación de hotel boutique", "Desayuno", "Taller de cocina tradicional mixteca", "Comidas tradicionales", "Visita a productores locales", "Bolsa con productos regionales para llevar"]'::jsonb, 
'{"no_incluye": ["Compras personales", "Propinas", "Servicios no especificados"]}'::jsonb, 1,
'["https://images.pexels.com/photos/34035522/pexels-photo-34035522.jpeg"]'::jsonb),

('cocinar-teotitlan-del-valle', 'Cocinar en Teotitlán del Valle', 'TALLER', 'Oaxaca', 3400.00, 'MXN', true, 
'La cocina tradicional zapoteca conserva técnicas que han pasado de generación en generación. La jornada comienza en el mercado de Tlacolula y continúa en una cocina tradicional en Teotitlán del Valle, donde se elaboran tortillas a mano, mole negro, chiles rellenos zapotecos y nicuatole, usando nixtamalización, molienda manual y comal de barro.', 
'["Recorrido guiado por mercado tradicional", "Taller de cocina tradicional zapoteca", "Preparación de platillos regionales", "Recetario impreso"]'::jsonb, 
'{"no_incluye": ["Compras personales", "Cena", "Propinas", "Servicios no especificados"]}'::jsonb, 1,
'["https://images.pexels.com/photos/27362438/pexels-photo-27362438.jpeg?q=80&w=2000&auto=format&fit=crop"]'::jsonb),

('mercado-patzcuaro-sopa-tarasca', 'Mercado de Pátzcuaro + Sopa Tarasca', 'TALLER', 'Michoacán', 3610.00, 'MXN', true, 
'La cocina purépecha conserva técnicas, ingredientes y recetas en las comunidades de la meseta michoacana. Comenzamos en el mercado de Pátzcuaro seleccionando ingredientes típicos. Luego en San Lorenzo, en cocina de tierra y comal artesanal se elaboran corundas, sopa tarasca, charales y atole de grano.', 
'["Recorrido guiado por el mercado", "Experiencia culinaria tradicional purépecha", "Preparación de platillos regionales", "Comida tradicional en comunidad", "Recetario impreso"]'::jsonb, 
'{"no_incluye": ["Hospedaje", "Compras personales"]}'::jsonb, 1,
'["https://images.pexels.com/photos/12204852/pexels-photo-12204852.jpeg"]'::jsonb),

('mercado-san-cristobal-tamales', 'Mercado de San Cristóbal + Tamales Tzeltales', 'TALLER', 'Chiapas', 3700.00, 'MXN', true, 
'Los tamales en Chiapas tienen más de 20 variantes. En las comunidades tzeltales se utiliza hoja de mashan. Iniciamos en el mercado de Santo Domingo en San Cristóbal, para luego viajar a Tenejapa donde se elaboran tamales de chipilín, pollo, frijol y el pictc ceremonial.', 
'["Recorrido por el mercado Santo Domingo", "Experiencia culinaria con familia local tzeltal", "Preparación tradicional de tamales", "4 tamales para llevar"]'::jsonb, 
'{"no_incluye": ["Hospedaje", "Compras personales"]}'::jsonb, 1,
'["https://images.unsplash.com/photo-1599334521854-ee2c9e535f6b?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2000"]'::jsonb),

('mercado-tradicional-merida', 'Mercado Tradicional de Mérida', 'TALLER', 'Yucatán', 2100.00, 'MXN', true, 
'La cocina yucateca posee una identidad única gracias al uso de achiote, chile habanero y recados. El recorrido explora el mercado Lucas de Gálvez, puestos de pavo horneado, hierbas regionales y pescados. Se realizan degustaciones de panuchos, salbutes y vaporcitos.', 
'["Recorrido guiado por el mercado Lucas de Gálvez", "Degustaciones tradicionales durante el recorrido", "Introducción a ingredientes y cocina yucateca", "Comida tradicional yucateca"]'::jsonb, 
'{"no_incluye": ["Hospedaje", "Compras personales", "Propinas"]}'::jsonb, 1,
'["https://images.pexels.com/photos/12016567/pexels-photo-12016567.jpeg"]'::jsonb),

('tianguis-tonala-horno-lena', 'Tianguis Tradicional y Cocina en Horno', 'TALLER', 'Jalisco', 2860.00, 'MXN', true, 
'Tonalá conserva una de las tradiciones artesanales y gastronómicas más representativas de Jalisco. La experiencia comienza en el tianguis artesanal y continúa participando en una cocina tradicional con horno de leña de mezquite, cerrando con una visita a un taller de barro bruñido.', 
'["Recorrido por el tianguis tradicional de Tonalá", "Comida preparada en horno de leña", "Visita a taller artesanal de alfarería", "Pieza de barro bruñido de regalo"]'::jsonb, 
'{"no_incluye": ["Hospedaje", "Compras adicionales", "Propinas"]}'::jsonb, 1,
'["https://images.pexels.com/photos/36214726/pexels-photo-36214726.jpeg"]'::jsonb),

-- CATEGORÍA 2: RUTAS GASTRONÓMICAS REGIONALES (ID 2)
('ruta-cochinita-sabores-mayab', 'Ruta de la Cochinita y Sabores del Mayab', 'RUTA REGIONAL', 'Yucatán', 18590.00, 'MXN', true, 
'La cocina yucateca es una de las más distintivas. La ruta comienza en Mérida, viaja a una comunidad maya (Yaxunah o Mucuyché) para cocinar cochinita en horno pib con una cocinera tradicional, visita un apiario de miel melipona y concluye en una hacienda restaurada.', 
'["Recomendación: 1 noche en hotel boutique en Mérida + 1 noche en hacienda restaurada", "Desayuno", "Comida", "Mercados + cocinera maya + horno pib + apiario", "Transporte desde Mérida"]'::jsonb, 
'{"no_incluye": ["Vuelo a Mérida", "Compras personales", "Hospedaje"]}'::jsonb, 2,
'["https://images.pexels.com/photos/33614195/pexels-photo-33614195.jpeg"]'::jsonb),

('ruta-siete-moles-oaxaca', 'Ruta de los Siete Moles de Oaxaca', 'RUTA REGIONAL', 'Oaxaca', 21440.00, 'MXN', true, 
'El mole oaxaqueño no es uno solo: son siete variedades tradicionales (negro, coloradito, amarillo, verde, rojo, chichilo y manchamanteles). Esta ruta recorre comunidades y cocinas que conservan estas preparaciones ancestrales.', 
'["Hospedaje recomendado en hotel boutique en Oaxaca", "Desayunos y comidas tradicionales", "Visita a comunidades y mercados de los 7 moles", "Clases con cocineras tradicionales", "Transporte incluido en ruta"]'::jsonb, 
'{"no_incluye": ["Vuelo a Oaxaca", "Alcohol", "Compras personales", "Hospedaje"]}'::jsonb, 2,
'["https://images.pexels.com/photos/34550456/pexels-photo-34550456.jpeg"]'::jsonb),

('ruta-mariscos-costa-sinaloa', 'Ruta de Mariscos en la Costa de Sinaloa', 'RUTA REGIONAL', 'Sinaloa', 16760.00, 'MXN', true, 
'Sinaloa es una de las despensas marinas más importantes del país. La experiencia comienza en Mazatlán, traslado a Altata para salir en panga con pescadores artesanales y cocinar con la captura del día, continuando hacia la sierra sinaloense en Cosalá.', 
'["Recomendación de hotel boutique en Mazatlán", "Desayuno y Comida", "Mercado + Panga + Cosalá", "Transporte desde aeropuerto Mazatlán"]'::jsonb, 
'{"no_incluye": ["Vuelo", "Compras personales", "Hospedaje"]}'::jsonb, 2,
'["https://images.pexels.com/photos/16741150/pexels-photo-16741150.jpeg"]'::jsonb),

('ruta-cacao-chocolate-tabasco', 'Ruta del Cacao y Chocolate en Tabasco', 'RUTA REGIONAL', 'Tabasco', 11820.00, 'MXN', true, 
'Tabasco es una de las regiones de origen del cacao en Mesoamérica. Recorreremos haciendas cacaoteras activas para conocer cultivos, fermentación y secado. Incluye un taller práctico de chocolate artesanal desde el grano: tostado en comal y molienda en metate.', 
'["Recomendación de hospedaje en hacienda boutique", "Desayuno y 2 comidas", "Visita a 2 haciendas cacaoteras", "Taller de chocolate desde el grano", "Transporte desde Villahermosa", "250 g de chocolate propio"]'::jsonb, 
'{"no_incluye": ["Vuelo", "Compras personales", "Hospedaje"]}'::jsonb, 2,
'["https://images.pexels.com/photos/7543116/pexels-photo-7543116.jpeg"]'::jsonb),

('ruta-maiz-criollo-mixteca', 'Ruta del Maíz Criollo en la Mixteca', 'RUTA REGIONAL', 'Oaxaca', 16630.00, 'MXN', true, 
'La Mixteca alta de Oaxaca conserva una de las mayores diversidades de maíz criollo. La ruta incluye convivencia con productores locales, caminatas por la milpa, y participación en nixtamalización, elaboración de tortillas a mano y atoles.', 
'["Recomendación de hospedaje en posada rural", "Desayuno y Comida", "Productores + caminatas + cocina", "1 kg de maíz criollo para llevar"]'::jsonb, 
'{"no_incluye": ["Vuelo", "Alcohol", "Hospedaje"]}'::jsonb, 2,
'["https://images.pexels.com/photos/5648605/pexels-photo-5648605.jpeg"]'::jsonb),

('ruta-mole-poblano-conventual', 'Ruta del Mole Poblano y Cocina Conventual', 'RUTA REGIONAL', 'Puebla', 7400.00, 'MXN', true, 
'Muchos de los platillos poblanos surgieron en las cocinas conventuales de los siglos XVII y XVIII. Recorreremos el Museo de la Cocina Poblana, tomaremos clase culinaria de mole en metate y visitaremos a un productor de chile poblano.', 
'["Recomendación de hotel boutique en Puebla", "Desayuno y 2 comidas", "2 conventos + cocinera + productor"]'::jsonb, 
'{"no_incluye": ["Vuelo a Puebla", "Alcohol", "Hospedaje"]}'::jsonb, 2,
'["https://images.pexels.com/photos/27960408/pexels-photo-27960408.jpeg"]'::jsonb),

-- CATEGORÍA 3: RUTAS DE CAFÉ (ID 3)
('ruta-cafe-veracruz-coatepec', 'Ruta del Café de Veracruz', 'RUTA DE CAFÉ', 'Veracruz', 9230.00, 'MXN', true, 
'La zona cafetalera del centro de Veracruz produce algunos de los cafés de altura más reconocidos del país. Traslado a una finca en Coatepec para conocer el proceso completo, sesión de cupping profesional, comida en Xico y taller de tostado en Coscomatepec.', 
'["Recomendación de hotel boutique", "Desayuno y 2 comidas", "2 fincas + tostadora", "Sesión de cupping", "Transporte desde Xalapa"]'::jsonb, 
'{"no_incluye": ["Vuelo o autobús", "Hospedaje"]}'::jsonb, 3,
'["https://images.pexels.com/photos/34536647/pexels-photo-34536647.jpeg"]'::jsonb),

('ruta-cafe-pluma-hidalgo', 'Ruta del Café en Pluma Hidalgo', 'RUTA DE CAFÉ', 'Oaxaca / Veracruz', 10470.00, 'MXN', true, 
'La experiencia se desarrolla en una finca activa: caminata por cafetales, conocimiento de variedades, participación en la pizca (según temporada) y recorrido por el beneficio de café. Incluye cupping profesional y el tostado de tu propio lote.', 
'["Recomendación de finca o cabaña boutique", "Desayuno y 2 comidas", "Caminata por cafetales y recorrido por beneficio", "Cata y cupping profesional", "Tostado de tu propio lote", "Transporte"]'::jsonb, 
'{"no_incluye": ["Vuelo o autobús", "Compras personales", "Hospedaje"]}'::jsonb, 3,
'["https://images.pexels.com/photos/34944778/pexels-photo-34944778.jpeg"]'::jsonb),

-- CATEGORÍA 4: RUTAS DE VINO Y QUESO (ID 4)
('ruta-queso-vino-queretaro', 'Ruta del Queso y Vino, Querétaro', 'RUTA ENOLÓGICA', 'Querétaro', 13220.00, 'MXN', true, 
'Querétaro se ha consolidado combinando producción de vino de altura con quesos artesanales. La ruta recorre vinícolas y queserías boutique del Bajío, con catas guiadas y gastronomía regional queretana.', 
'["Recomendación de hotel boutique", "Desayunos y comidas", "Visitas a vinícolas y queserías", "Catas de vino y queso guiadas", "Transporte incluido en ruta"]'::jsonb, 
'{"no_incluye": ["Vuelo", "Compras personales", "Hospedaje"]}'::jsonb, 4,
'["https://images.pexels.com/photos/32306361/pexels-photo-32306361.jpeg"]'::jsonb),

('valle-guadalupe-tres-casas', 'Valle de Guadalupe: Tres Casas Boutique', 'RUTA ENOLÓGICA', 'Baja California', 15580.00, 'MXN', true, 
'El Valle de Guadalupe produce más del 80% del vino mexicano. La experiencia recorre tres pequeñas vinícolas boutique con producción artesanal. Incluye degustaciones guiadas de perfiles aromáticos y comidas rodeados de viñedos con un sommelier privado.', 
'["Recomendación de hotel de viñedo", "Desayuno y 2 comidas", "Visita técnica a 3 vinícolas boutique", "Cata de 12 vinos", "Sommelier privado", "Transporte desde Tijuana o Ensenada"]'::jsonb, 
'{"no_incluye": ["Vuelo", "Botellas adicionales", "Compras personales", "Hospedaje"]}'::jsonb, 4,
'["https://images.pexels.com/photos/33526542/pexels-photo-33526542.jpeg"]'::jsonb);

-- =====================================================================================
-- 6. INSERTAR DETALLES MUNDIAL (FIFA)
-- =====================================================================================
INSERT INTO public.fifa_experiences_expgo (title, subtitle, description, items, image_url, order_index) VALUES

('Estadios y Museos', 'Recorridos Históricos', 'Visitas guiadas a los templos del fútbol y acceso a zonas restringidas.', 
'["Visitas guiadas a estadios FIFA y campos históricos", "Acceso a vestidores y zonas VIP (fotos y experiencias interactivas)", "Recorridos por museos de fútbol y exhibiciones temáticas"]'::jsonb, 
'https://images.pexels.com/photos/37463566/pexels-photo-37463566.jpeg', 1),

('Fan Experiences', 'Interacción Total', 'Zonas de realidad virtual y encuentros con leyendas del deporte.', 
'["Clínicas de fútbol y retos de habilidades", "Realidad virtual de partidos históricos", "Meet & greet con leyendas"]'::jsonb, 
'https://images.pexels.com/photos/38109922/pexels-photo-38109922.jpeg', 2),

('Viewing Parties', 'Eventos en Vivo', 'Proyección de partidos en pantallas gigantes con ambiente temático.', 
'["Pantallas gigantes", "Trivia y juegos recreativos", "Catering temático y snacks"]'::jsonb, 
'https://images.pexels.com/photos/23495482/pexels-photo-23495482.jpeg', 3),

('Cultura y Ciudad', 'Recorridos Urbanos', 'Explora el lado futbolero de las sedes mundialistas.', 
'["Street football tours", "Bares deportivos icónicos", "Arte urbano y murales de fútbol"]'::jsonb, 
'https://images.pexels.com/photos/13517352/pexels-photo-13517352.jpeg', 4),

('Experiencias educativas', 'Historia del fútbol y estrategias de juego', 'Descubre más acerca del fútbol y domina la cancha.', 
'["Talleres tácticos", "Trivia con premios", "Historia de los mundiales"]'::jsonb, 
'https://images.pexels.com/photos/38233935/pexels-photo-38233935.jpeg', 5);