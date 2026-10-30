import { LegalPage } from "@/components/LegalPage";

export default function RefundsPage() {
  const title = "Política de devoluciones y reembolsos";
  const sections = [
    {
      heading: "Introducción",
      content: "Última actualización: Octubre de 2026\n\nEn Explorago buscamos brindar experiencias turísticas y de entretenimiento de alta calidad, con una planeación clara y atención personalizada durante todo el proceso. Debido a la naturaleza de los servicios, las condiciones de cancelación, modificación y reembolso pueden variar dependiendo del tipo de experiencia, la fecha de reservación y los proveedores involucrados.\nLa presente Política de Reembolsos y Devoluciones establece las condiciones aplicables a las solicitudes de cancelación, modificación y reembolso de los servicios contratados con Explorago."
    },
    {
      heading: "1. Alcance de la política",
      content: "Esta política aplica a todos los servicios y experiencias contratados a través de Explorago, incluyendo itinerarios personalizados, tours, actividades culturales, experiencias de naturaleza y aventura, actividades acuáticas, experiencias gastronómicas, catas, eventos urbanos y demás servicios turísticos u operativos ofrecidos.\nCada reservación podrá estar sujeta a condiciones particulares que serán comunicadas al cliente antes de confirmar el servicio."
    },
    {
      heading: "2. Condiciones generales",
      content: "Todos los servicios están sujetos a disponibilidad al momento de realizar la reservación.\nDebido a que determinadas experiencias requieren la contratación o coordinación de proveedores externos (como transportistas, recintos, guías o establecimientos de hospedaje), las condiciones de cancelación y reembolso dependen en gran medida de las políticas establecidas por dichos terceros.\nAntes de realizar un pago o confirmar una reservación, se recomienda revisar detalladamente las condiciones específicas indicadas en la cotización o confirmación del servicio. La aceptación de una cotización y el pago correspondiente implican la aceptación implícita de las condiciones particulares aplicables a la experiencia contratada."
    },
    {
      heading: "3. Solicitudes de cancelación",
      content: "Todas las solicitudes de cancelación deberán realizarse formalmente por escrito mediante el correo electrónico: atencion@explorago.com.mx\nLa solicitud deberá incluir los siguientes datos:\nNombre completo de la persona que realizó la reservación.\nNúmero o referencia de la reservación o cotización.\nFecha programada para la experiencia.\nServicio o paquete contratado.\nMotivo de la cancelación.\nDatos de contacto para dar seguimiento a la solicitud.\nLa fecha y hora en que Explorago reciba la solicitud por correo electrónico será la considerada oficialmente para determinar la procedencia y los porcentajes o cargos de cancelación aplicables."
    },
    {
      heading: "4. Cancelaciones con derecho a reembolso",
      content: "Cuando las condiciones particulares de la experiencia permitan una cancelación con reembolso, el importe correspondiente será determinado de acuerdo con:\nLa anticipación con la que se solicite la cancelación previa a la fecha del servicio.\nEl tipo de servicio o paquete contratado.\nLas condiciones informadas expresamente en la cotización o confirmación.\nLos gastos administrativos o de gestión ya realizados.\nLos importes no reembolsables retenidos por proveedores externos.\nCuando corresponda un reembolso parcial, se descontarán los importes, cargos por servicio, comisiones bancarias o penalizaciones que no sean recuperables."
    },
    {
      heading: "5. Servicios no reembolsables",
      content: "Algunos servicios pueden ser total o parcialmente no reembolsables debido a compromisos contractuales con terceros o a la naturaleza de cupo limitado de la experiencia.\nEntre ellos pueden encontrarse:\nEntradas a parques, recintos, sitios históricos o atracciones turísticas.\nActividades con cupo limitado o reservación de fecha exclusiva.\nExperiencias gastronómicas o catas con insumos preparados con anticipación.\nServicios de transporte privado contratados bajo demanda.\nReservaciones de hospedaje bajo tarifas no reembolsables.\nActividades acuáticas o de aventura con instructores o guías dedicados.\nServicios adquiridos bajo promociones, descuentos o tarifas especiales.\nCualquier concepto señalado expresamente como \"no reembolsable\" en la cotización o confirmación."
    },
    {
      heading: "6. Cambios de fecha y reprogramación",
      content: "El cliente podrá solicitar un cambio de fecha para su experiencia. La viabilidad de realizar el cambio dependerá de:\nDisponibilidad de cupo y fechas en la agenda para la nueva fecha solicitada.\nCondiciones y políticas de reprogramación de los proveedores participantes.\nTipo de servicio o tarifa contratada.\nLa anticipación con la que se envíe la solicitud.\nDiferencias de precio o tarifa aplicables según la temporada.\nLos cambios solicitados por el cliente podrán generar cargos adicionales o nivelación de tarifas cuando resulten aplicables. Un cambio de fecha no se considerará confirmado hasta que Explorago lo comunique expresamente por escrito al cliente."
    },
    {
      heading: "7. Ajustes en el itinerario",
      content: "Los itinerarios pueden ajustarse antes o durante la prestación del servicio debido a razones climáticas, logísticas, operativas, de seguridad o causas de fuerza mayor.\nCuando sea necesario realizar una modificación en el itinerario, se procurará mantener el objetivo principal de la experiencia y ofrecer una alternativa equivalente. Los cambios o adiciones solicitados directamente por el cliente durante el desarrollo de la experiencia generarán costos adicionales que deberán ser cubiertos por el cliente."
    },
    {
      heading: "8. Cancelación por condiciones climáticas",
      content: "Ciertas experiencias al aire libre, en entornos naturales, acuáticos o de aventura dependen directamente de las condiciones del clima.\nCuando las condiciones meteorológicas representen un riesgo para la integridad de los participantes o impidan la realización segura de la actividad, Explorago o el operador a cargo podrán modificar, reprogramar o cancelar la experiencia.\nEn estos casos, se priorizará la reprogramación de la actividad en una fecha posterior. Si no fuera posible la reprogramación y correspondiera un reembolso conforme a las condiciones de los proveedores involucrados, se informará al cliente sobre el saldo a favor o el procedimiento de devolución aplicable."
    },
    {
      heading: "9. Cancelación por fuerza mayor o caso fortuito",
      content: "Una experiencia podrá ser modificada, reprogramada o cancelada debido a circunstancias fuera del control razonable de Explorago, tales como desastres naturales, emergencias sanitarias, restricciones gubernamentales, cierres viales o de recintos, manifestaciones, o fallas graves en la infraestructura local.\nEn tales situaciones, Explorago brindará la asistencia posible para ofrecer alternativas de reprogramación, créditos a favor o soluciones coordinadas con los proveedores directos."
    },
    {
      heading: "10. Cancelaciones por parte de Explorago",
      content: "En circunstancias excepcionales, Explorago podrá cancelar una experiencia cuando no sea posible garantizar la prestación segura o con los estándares de calidad correspondientes.\nDe presentarse esta situación, se notificará de inmediato al cliente y se le ofrecerá:\nReprogramación de la experiencia para otra fecha sin costo adicional.\nSustitución por una experiencia o paquete alternativo de valor equivalente.\nCrédito a favor para ser utilizado en futuros servicios.\nReembolso del importe pagado sujeto a la recuperación de los fondos comprometidos con terceros."
    },
    {
      heading: "11. Inasistencia del cliente (No Show)",
      content: "Si el cliente o los participantes no se presentan en el punto de encuentro, lugar y horario establecidos en la confirmación del servicio, la reservación se considerará como utilizada (No Show).\nLa inasistencia no dará derecho a reembolso, devolución ni reprogramación del servicio, dado que los recursos, personal y logística quedan reservados de forma exclusiva para el grupo o participante. Se recomienda presentarse con al menos 15 minutos de anticipación al horario pactado."
    },
    {
      heading: "12. Retrasos por parte del cliente",
      content: "Los retrasos ocasionados por el cliente pueden afectar el desarrollo del itinerario programado.\nSi un retraso provoca la pérdida de una actividad, reservación, entrada a un recinto o servicio de transporte, los costos adicionales que se generen para la reestructuración del servicio serán responsabilidad exclusiva del cliente. El personal operativo no estará obligado a extender la duración del servicio para compensar el tiempo perdido por retraso del usuario."
    },
    {
      heading: "13. Gastos no reembolsables",
      content: "En ningún caso serán objeto de reembolso o devolución los siguientes conceptos:\nGastos personales de cualquier índole realizados durante el viaje o actividad.\nPropinas para guías, chóferes o personal de servicio.\nAlimentos, bebidas o compras no incluidos de origen en el paquete contratado.\nEntradas o actividades adicionales contratadas por cuenta del cliente fuera del programa.\nGastos de transportación hacia el punto de encuentro inicial cuando este no forme parte del servicio contratado.\nComisiones de pago, transferencias o diferencias cambiarias cobradas por instituciones bancarias."
    },
    {
      heading: "14. Reembolsos por servicios de terceros",
      content: "Cuando un servicio sea prestado total o parcialmente por un proveedor externo, el reembolso estará sujeto a las condiciones y tiempos de respuesta de dicho tercero. Explorago actuará como intermediario para gestionar la solicitud de devolución, pero el tiempo de resolución final dependerá de los procesos internos de cada empresa proveedora."
    },
    {
      heading: "15. Método y tiempos de reembolso",
      content: "Cuando proceda un reembolso, este se procesará preferentemente a través del mismo método de pago utilizado para la compra original (transferencia bancaria o tarjeta de crédito/débito).\nEl tiempo reflejado en la cuenta o estado de cuenta del cliente dependerá de la institución financiera o pasarela de pago correspondiente. Explorago no asumirá responsabilidad por los plazos de acreditación que dependan de los bancos emisores."
    },
    {
      heading: "16. Procedimiento para solicitudes de reembolso",
      content: "Toda solicitud formal de reembolso debe enviarse a: atencion@explorago.com.mx\nUna vez recibida la información completa, nuestro equipo evaluará el caso en un plazo razonable y notificará al cliente por escrito la procedencia de la solicitud, desglosando, en su caso, los montos a devolver y los conceptos aplicados."
    },
    {
      heading: "17. Modificaciones a esta política",
      content: "Explorago se reserva el derecho de modificar o actualizar la presente Política de Reembolsos y Devoluciones en cualquier momento para reflejar cambios en nuestras operaciones, alianzas con proveedores o actualizaciones legislativas.\nLa versión vigente estará disponible en todo momento para su consulta en: https://explorago.com.mx/"
    },
    {
      heading: "18. Aceptación",
      content: "Al realizar una reservación, anticipo o contratación con Explorago, el cliente reconoce haber leído, entendido y aceptado en su totalidad las condiciones de cancelación, modificación y reembolso aquí establecidas."
    },
    {
      heading: "19. Canales de contacto",
      content: "Para cualquier duda, aclaración, solicitud de cancelación o gestión de reembolso, puedes ponerte en contacto con nuestro equipo de atención:\nExplorago\nDirección: Av. Revolución 1564, San Ángel, Álvaro Obregón, 01020 Ciudad de México, CDMX\nCorreo electrónico: atencion@explorago.com.mx\nTeléfono: +52 1 55 5662 5469\nSitio web: explorago.com.mx"
    }
  ];

  return <LegalPage title={title} sections={sections} />;
}
