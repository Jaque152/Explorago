import { LegalPage } from "@/components/LegalPage";

export default function PrivacyPage() {
  const title = "Política de privacidad";
  const sections = [
    {
      heading: "Introducción",
      content: "Última actualización: Octubre de 2026\n\nEn Explorago nos comprometemos a proteger la privacidad y seguridad de los datos personales que nos proporciones a través de nuestro sitio web, formularios de contacto, solicitudes de cotización, reservaciones y demás medios de comunicación relacionados con nuestros servicios turísticos y de entretenimiento.\nLa presente Política de Privacidad tiene como finalidad informarte sobre qué datos personales recabamos, para qué los utilizamos, cómo los protegemos y cuáles son tus derechos respecto de dichos datos."
    },
    {
      heading: "1. Responsable del tratamiento de los datos personales",
      content: "El responsable del tratamiento y protección de tus datos personales es:\nNombre comercial: Explorago\nDomicilio: Av. Revolución 1564, San Ángel, Álvaro Obregón, 01020 Ciudad de México, CDMX\nCorreo electrónico: atencion@explorago.com.mx\nTeléfono: +52 1 55 5662 5469\nPara cualquier asunto relacionado con esta Política de Privacidad o con el tratamiento de tus datos personales, puedes comunicarte con nosotros a través del correo electrónico atencion@explorago.com.mx."
    },
    {
      heading: "2. Datos personales que podemos recabar",
      content: "Dependiendo de la interacción que tengas con nosotros, podremos recabar las siguientes categorías de datos personales:\n\nDatos de identificación y contacto\nNombre completo.\nCorreo electrónico.\nNúmero telefónico.\nDirección o ubicación (cuando aplique).\nInformación proporcionada voluntariamente mediante formularios de contacto, chat o canales de comunicación directa.\n\nDatos relacionados con la experiencia o servicio\nCuando solicites una cotización, diseñemos una experiencia o contrates alguno de nuestros servicios, podremos solicitar información necesaria para preparar y prestar la experiencia, como:\nFechas tentativas del servicio o evento.\nDestinos o sedes de interés.\nPreferencias y requerimientos de la experiencia.\nTipo de servicio o paquete solicitado.\nNúmero de participantes o visitantes.\nPresupuesto estimado.\nInformación necesaria para coordinar y realizar la reservación correspondiente.\nÚnicamente solicitaremos los datos que resulten necesarios para atender tu solicitud, preparar una propuesta, gestionar una reservación o prestar los servicios contratados."
    },
    {
      heading: "3. Datos personales sensibles",
      content: "Explorago no solicita de manera ordinaria datos personales sensibles a través del sitio web.\nEn caso de que, para la adecuada prestación de un servicio, resulte indispensable conocer algún dato que pueda considerarse sensible conforme a la legislación aplicable (como especificaciones médicas, de movilidad o restricciones particulares para la realización de una actividad), se solicitará el consentimiento correspondiente cuando éste sea legalmente necesario y se utilizará únicamente para la finalidad específica para la cual fue recabado.\nTe recomendamos no proporcionar mediante formularios de contacto información sensible que no sea necesaria para la atención de tu solicitud."
    },
    {
      heading: "4. Finalidades del tratamiento",
      content: "Los datos personales que nos proporciones podrán ser utilizados para las siguientes finalidades:\n\nFinalidades primarias\nSon aquellas necesarias para atender tu solicitud y proporcionar nuestros servicios:\nAtender preguntas, comentarios y solicitudes de información.\nResponder solicitudes de cotización.\nDiseñar, personalizar y gestionar las experiencias y servicios solicitados.\nConocer tus intereses, fechas tentativas y presupuesto para elaborar propuestas ajustadas.\nGestionar reservaciones, accesos y confirmaciones de agenda.\nDar seguimiento a las propuestas realizadas.\nCoordinar la prestación operativa de los servicios.\nMantener comunicación contigo antes, durante y después de la prestación del servicio.\nProporcionar atención, soporte y asistencia técnica o logística.\nGestionar pagos, facturación y comprobantes fiscales cuando corresponda.\nCumplir obligaciones legales y contractuales.\nAtender aclaraciones, cancelaciones, devoluciones o solicitudes relacionadas con los servicios contratados.\nMantener registros administrativos y operativos necesarios.\n\nFinalidades secundarias\nDe manera adicional, podremos utilizar tus datos para:\nEnviar información sobre nuevas experiencias, promociones, paquetes y servicios.\nRealizar encuestas de satisfacción y calidad en el servicio.\nSolicitar opiniones o comentarios sobre la experiencia.\nMejorar nuestros servicios y la atención al cliente.\nElaborar estadísticas internas y análisis de uso del sitio.\nEnviar comunicaciones comerciales y publicitarias.\n\nSi no deseas que tus datos sean utilizados para alguna de las finalidades secundarias, podrás manifestarlo en cualquier momento enviando un correo electrónico a atencion@explorago.com.mx.\nLa negativa para el uso de tus datos personales para finalidades secundarias no será motivo para negar los servicios o productos que hayas solicitado o contratado."
    },
    {
      heading: "5. Base legal para el tratamiento",
      content: "El tratamiento de tus datos personales se realizará conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y demás legislación mexicana aplicable.\nDependiendo de la finalidad, trataremos tus datos con base en:\nTu consentimiento expreso o tácito.\nLa necesidad de ejecutar o preparar un contrato o la prestación de un servicio solicitado.\nEl cumplimiento de obligaciones legales y administrativas.\nNuestro interés legítimo para la mejora y seguridad de los servicios, respetando en todo momento tus derechos y libertades."
    },
    {
      heading: "6. Uso de formularios del sitio web",
      content: "Nuestro sitio web explorago.com.mx cuenta con formularios mediante los cuales puedes proporcionar datos como nombre, correo electrónico, teléfono y mensaje para solicitar información, cotizaciones o atención personalizada.\nLos datos proporcionados mediante dichos formularios serán utilizados para:\nIdentificar y contactar al solicitante.\nAtender la consulta o requerimiento específico.\nPreparar y enviar cotizaciones o propuestas.\nDar seguimiento oportuno a las solicitudes.\nNo deberás proporcionar información personal de terceros sin contar previamente con la autorización correspondiente del titular."
    },
    {
      heading: "7. Transferencia de datos personales",
      content: "Para poder diseñar, coordinar y ejecutar determinadas experiencias o servicios, podremos compartir los datos estrictamente necesarios con proveedores y socios comerciales que participen en la operación de los servicios contratados.\nEstos terceros pueden incluir, según el tipo de servicio:\nOperadores logísticos y de experiencias.\nGuías, instructores o personal operativo de las actividades.\nProveedores de transporte o accesos a recintos/instalaciones.\nEstablecimientos de hospedaje, alimentos o experiencias complementarias.\nPlataformas de gestión e intermediarios de servicios turísticos o de entretenimiento.\nCuando exista una transferencia de datos, procuraremos compartir únicamente la información indispensable para cumplir con la finalidad correspondiente y exigiremos a los terceros mantener las medidas de seguridad administrativas, técnicas y físicas adecuadas conforme a la ley.\nAsimismo, se podrán realizar transferencias sin requerir consentimiento cuando sean requeridas por autoridad competente conforme a derecho o sea necesario para el cumplimiento de una obligación legal."
    },
    {
      heading: "8. Proveedores de servicios tecnológicos",
      content: "Para operar nuestro sitio web explorago.com.mx y gestionar nuestras operaciones digitales, podemos recurrir a terceros prestadores de servicios tecnológicos (servidores de alojamiento web, plataformas de correo electrónico, herramientas de análisis de datos, sistemas CRM y pasarelas de pago).\nEstos proveedores tendrán acceso a la información únicamente en la medida necesaria para prestar sus servicios a Explorago y bajo compromisos de confidencialidad y protección de datos."
    },
    {
      heading: "9. Pagos y datos financieros",
      content: "Cuando realices un pago relacionado con nuestros servicios a través de medios digitales, los datos financieros y de tarjetas bancarias serán procesados directamente por las plataformas de pago electrónicas autorizadas.\nExplorago no almacena ni conserva directamente números completos de tarjetas de crédito o débito en sus servidores web. Conservaremos únicamente la información contable y comprobantes necesarios para la acreditación de pagos, facturación y cumplimiento fiscal aplicable."
    },
    {
      heading: "10. Cookies y tecnologías similares",
      content: "Nuestro sitio web utiliza cookies, balizas (beacons) y tecnologías similares para facilitar la navegación, personalizar el contenido, analizar el tráfico del sitio y mejorar tu experiencia como usuario.\nEstas tecnologías permiten recopilar información como:\nDirección IP y tipo de navegador.\nSistema operativo y tipo de dispositivo.\nPáginas visitadas dentro del sitio y tiempo de permanencia.\nEnlaces consultados y origen de la visita.\nPuedes configurar o desactivar el uso de cookies directamente desde la configuración de tu navegador web. Toma en cuenta que la desactivación de ciertas cookies podría afectar la funcionalidad o el correcto despliegue de algunas secciones de explorago.com.mx."
    },
    {
      heading: "11. Conservación de los datos personales",
      content: "Conservaremos tus datos personales únicamente durante el tiempo que sea necesario para cumplir con las finalidades para las que fueron recabados, así como para cumplir con las obligaciones legales, contables, fiscales y administrativas correspondientes.\nUna vez concluidos los plazos legales o la finalidad del tratamiento, la información será eliminada, bloqueada o anonimizada conforme a la normativa vigente."
    },
    {
      heading: "12. Medidas de seguridad",
      content: "Explorago implementa y mantiene medidas de seguridad administrativas, técnicas y físicas diseñadas para proteger tus datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o tratamiento no autorizado.\nEl acceso a la información personal está restringido exclusivamente al personal y colaboradores autorizados que requieran conocerla para desempeñar sus funciones relativas a las finalidades señaladas."
    },
    {
      heading: "13. Derechos ARCO",
      content: "Como titular de los datos personales, tienes derecho a ejercer tus derechos ARCO conforme a la legislación aplicable:\nAcceso: Conocer qué datos personales tenemos registrados, para qué los utilizamos y las condiciones de su uso.\nRectificación: Solicitar la corrección de tu información personal en caso de que esté desactualizada, sea inexacta o esté incompleta.\nCancelación: Solicitar la eliminación de tus datos de nuestros registros cuando consideres que no están siendo utilizados conforme a los principios y deberes legales.\nOposición: Oponerte al uso de tus datos personales para finalidades específicas (por ejemplo, fines mercadotécnicos).\nPara ejercer cualquiera de los derechos ARCO, deberás enviar una solicitud formal al correo electrónico: atencion@explorago.com.mx.\nLa solicitud deberá incluir:\nNombre completo del titular y medio de contacto para notificar la respuesta (correo electrónico).\nDocumento de identificación oficial que acredite la identidad del titular o la representación legal.\nDescripción clara y precisa de los datos personales respecto de los cuales se busca ejercer alguno de los derechos ARCO.\nCualquier elemento o documento que facilite la localización de los datos.\nAtenderemos y resolveremos tu solicitud conforme a los plazos establecidos por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
    },
    {
      heading: "14. Revocación del consentimiento",
      content: "Puedes revocar en cualquier momento el consentimiento que nos hayas otorgado para el tratamiento de tus datos personales enviando un correo a atencion@explorago.com.mx.\nEs importante considerar que la revocación del consentimiento no tiene efectos retroactivos y que en ciertos casos no podremos concluir el tratamiento de forma inmediata si existe alguna obligación legal o contractual que nos exija conservar la información."
    },
    {
      heading: "15. Limitación del uso o divulgación",
      content: "Si deseas limitar el uso o divulgación de tus datos personales para dejar de recibir publicidad, avisos promocionales o boletines por correo electrónico, puedes enviarnos tu solicitud a atencion@explorago.com.mx o hacer uso del enlace de cancelación de suscripción incluido en la parte inferior de los correos electrónicos informativos que te enviemos."
    },
    {
      heading: "16. Protección de menores de edad",
      content: "Los servicios ofertados a través de nuestro sitio web no están dirigidos de manera directa e independiente a menores de edad.\nEn los casos en que se recaben datos de menores para la logística o contratación de una experiencia solicitada por un padre, madre, tutor o representante legal, dicha información será tratada con estricta confidencialidad y únicamente para las finalidades del servicio contratado."
    },
    {
      heading: "17. Modificaciones a esta Política de Privacidad",
      content: "Explorago se reserva el derecho de efectuar en cualquier momento modificaciones o actualizaciones a la presente Política de Privacidad para la atención de novedades legislativas, jurisprudenciales, políticas internas o nuevos requerimientos para la prestación de nuestros servicios.\nCualquier cambio o actualización estará disponible para su consulta permanente en el sitio web: https://explorago.com.mx/"
    },
    {
      heading: "18. Consentimiento",
      content: "Al navegar en nuestro sitio web, enviar formularios de contacto, solicitar cotizaciones o contratar los servicios ofrecidos por Explorago, reconoces haber leído y comprendido la presente Política de Privacidad y manifiestas tu conformidad con los términos y condiciones aquí establecidos."
    },
    {
      heading: "19. Medios de contacto",
      content: "Si tienes dudas, comentarios o deseas ejercer tus derechos relacionados con la protección de tus datos personales, puedes contactar al área responsable en:\nExplorago\nDirección: Av. Revolución 1564, San Ángel, Álvaro Obregón, 01020 Ciudad de México, CDMX\nCorreo electrónico: atencion@explorago.com.mx\nTeléfono: +52 1 55 5662 5469\nSitio web: explorago.com.mx"
    }
  ];

  return <LegalPage title={title} sections={sections} />;
}
