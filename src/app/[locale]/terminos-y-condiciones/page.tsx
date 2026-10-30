import { LegalPage } from "@/components/LegalPage";

export default function TermsPage() {
  const title = "Términos y condiciones";
  const sections = [
    {
      heading: "Introducción",
      content: "Última actualización: Octubre de 2026\n\nBienvenido a Explorago. Al acceder, navegar o utilizar nuestro sitio web explorago.com.mx, así como al solicitar, reservar o contratar cualquiera de nuestros servicios turísticos y de entretenimiento, aceptas los presentes Términos y Condiciones.\nTe recomendamos leerlos detenidamente antes de realizar cualquier solicitud, reservación o contratación."
    },
    {
      heading: "1. Información general",
      content: "Explorago ofrece servicios relacionados con la planeación, diseño, coordinación y comercialización de experiencias, viajes y actividades turísticas o de entretenimiento.\nEntre los servicios que podemos ofrecer se encuentran:\nDiseño de itinerarios personalizados.\nExperiencias culturales, temáticas y turísticas.\nVisitas a sitios históricos y arqueológicos.\nActividades de ecoturismo y aventura.\nExperiencias de playa y actividades acuáticas.\nExperiencias gastronómicas.\nRutas de vino y catas.\nExperiencias artísticas y eventos culturales.\nActividades urbanas y de entretenimiento.\nCoordinación logística de servicios turísticos y experiencias personalizadas.\nLa disponibilidad y características de cada servicio dependerán de la experiencia, destino, fecha, proveedores participantes y condiciones específicas de la contratación."
    },
    {
      heading: "2. Aceptación de los Términos y Condiciones",
      content: "Al utilizar este sitio web o contratar cualquiera de nuestros servicios, declaras que:\nHas leído y comprendido estos Términos y Condiciones.\nAceptas quedar sujeto a ellos en su totalidad.\nProporcionas información verdadera, exacta y actualizada.\nTienes plena capacidad legal para contratar los servicios solicitados.\nEn caso de realizar una contratación en nombre de terceros o de un grupo de viajeros/participantes, cuentas con la autorización legal previa correspondiente.\nSi no estás de acuerdo con alguno de estos términos, deberás abstenerte de utilizar el sitio o contratar nuestros servicios."
    },
    {
      heading: "3. Información del sitio web",
      content: "Procuramos que la información publicada en nuestro sitio web explorago.com.mx sea clara, actualizada y precisa.\nSin embargo, las fotografías, descripciones, horarios, precios, disponibilidad y características de determinadas experiencias pueden estar sujetas a cambios debido a condiciones operativas, climáticas, de temporada, disponibilidad de proveedores u otras circunstancias ajenas a nuestro control.\nLa información mostrada en el sitio web tiene carácter orientativo e informativo y no constituye necesariamente una confirmación definitiva de reserva. La contratación se considerará confirmada únicamente cuando Explorago emita y comunique expresamente la confirmación correspondiente."
    },
    {
      heading: "4. Cotizaciones",
      content: "Las solicitudes realizadas a través del sitio web, correo electrónico, teléfono u otros medios de contacto podrán generar una cotización personalizada.\nLas cotizaciones dependerán de factores como:\nNúmero de participantes o viajeros.\nFechas programadas para la experiencia o viaje.\nDestino o sede.\nTipo de experiencia o paquete seleccionado.\nDisponibilidad.\nServicios incluidos y adicionales solicitados.\nProveedores participantes.\nTemporada alta/baja.\nCondiciones de transporte, hospedaje, accesos u otros servicios.\nUna cotización no constituye por sí misma una reservación confirmada. Los precios y condiciones indicados en una cotización tendrán la vigencia señalada en la misma. Si no se indica una vigencia específica, estarán sujetos a disponibilidad y podrán modificarse antes de la confirmación formal de la reserva."
    },
    {
      heading: "5. Reservaciones",
      content: "Una reservación se considerará confirmada una vez que el cliente haya cumplido expresamente con las condiciones indicadas en la cotización o comprobante de confirmación.\nDependiendo del servicio, se podrá requerir:\nEl pago total del servicio.\nEl pago de un anticipo o depósito de garantía.\nLa confirmación de datos de identificación de los participantes.\nLa aceptación expresa de las condiciones particulares de la experiencia.\nEl cumplimiento de requisitos específicos establecidos por proveedores finales.\nEl envío de una solicitud mediante formularios o correo electrónico no garantiza la reserva del cupo o fecha hasta su oportuna confirmación e ingreso de pago."
    },
    {
      heading: "6. Precios y pagos",
      content: "Los precios de nuestros servicios se indicarán en la cotización, página del servicio o medio de contratación correspondiente.\nLos precios pueden variar dependiendo de la fecha, disponibilidad, número de participantes, temporada y condiciones de los proveedores involucrados.\nCuando una experiencia requiera pago anticipado, la validez de la reservación quedará sujeta a la recepción y validación del pago correspondiente por parte del departamento financiero de Explorago.\nEl cliente es responsable de proporcionar información correcta para procesar el pago y de conservar sus comprobantes. Cuando el pago sea procesado mediante pasarelas externas, se aplicarán también los términos y condiciones de dicha plataforma de pago."
    },
    {
      heading: "7. Servicios incluidos y no incluidos",
      content: "Cada experiencia o itinerario contará con especificaciones particulares respecto de los servicios incluidos. El cliente debe revisar detalladamente la propuesta o cotización antes de confirmar la contratación.\nSalvo que se indique de manera explícita en la confirmación por escrito, se entienden como gastos NO incluidos:\nGastos personales de cualquier índole.\nPropinas para guías, chóferes o personal de servicio.\nAlimentos y bebidas no especificados explícitamente en el programa.\nEntradas a atracciones, recintos o actividades adicionales no listadas.\nServicios adicionales solicitados con posterioridad a la contratación.\nGastos derivados de modificaciones al itinerario solicitadas por el cliente.\nCostos adicionales ocasionados por retrasos, cancelaciones o faltas atribuibles al cliente."
    },
    {
      heading: "8. Cambios solicitados por el cliente",
      content: "El cliente podrá solicitar modificaciones o cambios en su reservación o itinerario programado.\nLa factibilidad de aplicar dichos cambios estará sujeta a la disponibilidad técnica, operativa y a las políticas de los proveedores involucrados. Cualquier cambio puede generar costos adicionales, penalizaciones o diferencias de tarifa que deberán ser cubiertos en su totalidad por el cliente antes de la prestación del servicio."
    },
    {
      heading: "9. Cancelaciones por parte del cliente",
      content: "Las condiciones y cargos aplicables por cancelación dependerán del tipo de servicio contratado y de los términos de los proveedores involucrados.\nAl momento de confirmar la reserva, se informarán las condiciones específicas de cancelación, reembolso o reprogramación. Si la cancelación genera penalizaciones o gastos no reembolsables por parte de terceros (hoteles, transportistas, parques, etc.), dichos montos se descontarán del importe que pudiera corresponder a devolución.\nToda solicitud de cancelación deberá enviarse por escrito al correo electrónico: atencion@explorago.com.mx"
    },
    {
      heading: "10. Reembolsos",
      content: "Cuando resulte procedente un reembolso, este se tramitará conforme a las condiciones de la reservación y a las políticas de los proveedores externos que intervengan.\nNo todos los servicios turísticos o de entretenimiento son reembolsables. Los tiempos de procesamiento del reembolso dependerán del medio de pago utilizado, pasarelas y tiempos operativos de las instituciones financieras. Las comisiones bancarias o transaccionales generadas por el pago o devolución no serán reembolsables salvo disposición legal en contrario."
    },
    {
      heading: "11. Cancelaciones o cambios por parte de Explorago",
      content: "En circunstancias extraordinarias o de fuerza mayor, Explorago o los proveedores operativos podrán modificar, reprogramar o cancelar una experiencia.\nEsto puede ocurrir debido a:\nCondiciones climáticas adversas o riesgos meteorológicos.\nFenómenos naturales o contingencias ambientales.\nSituaciones de seguridad local o nacional.\nCierres imprevistos de sitios turísticos, recintos o carreteras.\nFallas técnicas u operativas no previsibles.\nCircunstancias de fuerza mayor o caso fortuito.\nEn estos casos, se informará oportunamente al cliente y se priorizará la reprogramación del servicio o la sustitución por una alternativa de valor similar. En caso de cancelación definitiva sin alternativa viable, se aplicarán los criterios de reembolso correspondientes conforme a las condiciones del servicio."
    },
    {
      heading: "12. Proveedores externos",
      content: "Para la prestación integral de ciertas experiencias, Explorago actúa como intermediario o coordinador frente a proveedores externos especializados (como hoteles, restaurantes, transportistas, guías locales, parques temáticos y operadores de aventura).\nDichos terceros cuentan con sus propios términos de servicio, reglamentos internos y medidas de seguridad, los cuales deben ser acatados por los participantes durante el desarrollo de la experiencia."
    },
    {
      heading: "13. Responsabilidad del viajero o usuario",
      content: "El usuario o cliente se compromete a:\nProporcionar información verídica, exacta y completa para la gestión de su reserva.\nPresentarse con puntualidad en los puntos de encuentro y horarios establecidos.\nPortar la documentación oficial requerida durante todo el trayecto o experiencia.\nSeguir en todo momento las recomendaciones e instrucciones del personal a cargo, guías e instructores.\nRespetar las normas de conducta, instalaciones y patrimonio de las zonas o sitios visitados.\nNotificar con oportunidad cualquier condición médica o requerimiento especial.\nLa falta de puntualidad, la ausencia de documentación requerida o la inobservancia de las normas de seguridad pueden resultar en la pérdida de la actividad sin derecho a compensación o reembolso."
    },
    {
      heading: "14. Documentación y requisitos de viaje",
      content: "Es responsabilidad exclusiva del participante contar con la documentación oficial vigente (identificación oficial, pasaportes, visas, permisos o certificados sanitarios) que sea exigida por las autoridades para la realización de la experiencia o traslado.\nExplorago podrá brindar orientación general sobre los requisitos, pero no asumirá responsabilidad por la denegación de accesos o abordajes derivados del incumplimiento de requisitos por parte del cliente."
    },
    {
      heading: "15. Actividades de aventura y actividades físicas",
      content: "Ciertas experiencias pueden involucrar la práctica de deportes, caminatas, actividades acuáticas o de aventura que conllevan un riesgo inherente.\nAl participar en estas actividades, el cliente declara encontrarse en condiciones físicas y de salud adecuadas para su desarrollo y se compromete a cumplir rigurosamente con el uso del equipo de protección y con los protocolos de seguridad. Explorago o el operador a cargo podrán restringir la participación de un usuario si se determina que su condición compromete su seguridad o la del grupo."
    },
    {
      heading: "16. Pertenencias personales",
      content: "El cliente es responsable del cuidado y custodia de sus pertenencias personales, dispositivos electrónicos, equipaje y objetos de valor durante la realización de los servicios o traslados.\nExplorago no se hace responsable por extravíos, robos, olvidos o daños en los objetos personales de los usuarios durante el desarrollo de las actividades, salvo cuando exista responsabilidad directa imputable por negligencia grave comprobada conforme a la legislación aplicable."
    },
    {
      heading: "17. Fuerza mayor y caso fortuito",
      content: "Explorago no será responsable del incumplimiento o retraso en las obligaciones contraídas cuando este sea causado por eventos fuera de su control razonable, tales como desastres naturales, eventos meteorológicos graves, huelgas, bloqueos viales, emergencias sanitarias, actos de autoridades o fallas generales en redes de transporte y servicios públicos."
    },
    {
      heading: "18. Propiedad intelectual",
      content: "Todo el contenido visual, textual, marcas, logotipos, elementos gráficos, diseño del sitio, fotografías y código fuente de explorago.com.mx son propiedad exclusiva de Explorago o cuentan con la debida licencia de uso.\nQueda strictly prohibida la reproducción, copia, distribución o comercialización de cualquier elemento del sitio web sin la autorización previa y por escrito de Explorago."
    },
    {
      heading: "19. Uso adecuado del sitio web",
      content: "El usuario se obliga a utilizar el sitio web de conformidad con la ley y la moral. Queda prohibido ingresar virus, realizar ataques cibernéticos, extraer datos masivos mediante scraping, o utilizar los formularios para el envío de información falsa, engañosa o spam.\nExplorago se reserva el derecho de restringir o bloquear el acceso al sitio a cualquier usuario que haga un uso indebido de la plataforma."
    },
    {
      heading: "20. Enlaces a terceros",
      content: "Nuestro sitio web puede contener enlaces hacia páginas o plataformas operadas por terceros. Explorago no ejerce control sobre los contenidos, términos o políticas de privacidad de dichos sitios externos, por lo que el acceso a los mismos queda bajo la responsabilidad del usuario."
    },
    {
      heading: "21. Protección de datos personales",
      content: "La recolección y tratamiento de tus datos personales a través del sitio web o durante la contratación de nuestros servicios se rige por lo dispuesto en nuestra Política de Privacidad."
    },
    {
      heading: "22. Comunicaciones",
      content: "Toda comunicación formal relacionada con cotizaciones, aclaraciones, reservaciones, cambios o cancelaciones deberá realizarse por escrito a través del correo electrónico atencion@explorago.com.mx o mediante los canales oficiales señalados en el sitio.\nEs responsabilidad del cliente mantener sus datos de contacto actualizados para recibir notificaciones sobre sus servicios contratados."
    },
    {
      heading: "23. Modificaciones de los Términos y Condiciones",
      content: "Explorago se reserva el derecho de actualizar o modificar estos Términos y Condiciones en cualquier momento sin previo aviso para adaptarlos a novedades legislativas, jurisprudenciales o de operación comercial.\nLa versión actualizada estará siempre disponible en el sitio web explorago.com.mx. Las modificaciones no afectarán las condiciones de servicios que hayan sido previamente confirmados, salvo por disposiciones legales o causas de fuerza mayor."
    },
    {
      heading: "24. Legislación aplicable y jurisdicción",
      content: "Los presentes Términos y Condiciones se rigen e interpretan conforme a las leyes vigentes de los Estados Unidos Mexicanos. Para la solución de cualquier controversia derivada del uso del sitio web o de la prestación de nuestros servicios, las partes acuerdan someterse expresamente a la jurisdicción de los tribunales competentes en la Ciudad de México, renunciando a cualquier otro fuero que por razón de sus domicilios presentes o futuros pudiera corresponderles."
    },
    {
      heading: "25. Datos de contacto",
      content: "Para cualquier duda, aclaración o comentario relacionado con los presentes Términos y Condiciones, puedes ponerte en contacto con nosotros:\nExplorago\nDirección: Av. Revolución 1564, San Ángel, Álvaro Obregón, 01020 Ciudad de México, CDMX\nCorreo electrónico: atencion@explorago.com.mx\nTeléfono: +52 1 55 5662 5469\nSitio web: explorago.com.mx"
    }
  ];

  return <LegalPage title={title} sections={sections} />;
}
