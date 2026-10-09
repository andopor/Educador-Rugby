# Estado · 9 de octubre de 2026

## Confirmado

- Carpeta independiente: `13_Educador_Rugby`.
- Educador RCP sirve como referencia de diseño y organización; no se modifica.
- El contenido de rugby se prepara desde cero.
- No hay cintas: se utiliza doble tap.
- Cuarto objetivo: aplicar fijación al par o al impar en un 2×2.
- Sesiones iniciales: progresiones por parejas (pasar; pasar y cruzar por detrás) y por tríos o trenzas.
- Se elimina el apartado de preparación de la guía.
- Evaluación docente de 2×1 en dos líneas diferentes y 2×2 en la línea final: decisión, precisión del pase y recepción, continuidad, avant, fuera de juego y defensa.

## Propuesta inicial, pendiente de ajuste

- Destinatarios: 1.º ESO, según el contexto del proyecto.
- Seis sesiones de 50 minutos.
- Distribución de las progresiones en seis sesiones.
- Definición operativa del doble tap como toque simultáneo de ambas manos, continuidad posterior y convención par/impar: pendientes de confirmar con el docente.
- Guía docente primero; web para alumnado posteriormente.
- Evaluación formativa por observación y entre compañeros, sin calificación automática decidida.

## Falta concretar con el docente

Organización y rotaciones de las dos líneas de 2×1 y la línea final de 2×2; escala, ponderación y registro de infracciones de la evaluación; número y duración real de las sesiones; tamaño del grupo; experiencia previa; espacio; balones disponibles; ejecución y continuidad del doble tap; convención par/impar; necesidades de participación y apoyos; idioma de los materiales; relación con la programación y criterios curriculares; formato final de la web.

## Inventario inicial

La carpeta estaba vacía, sin repositorio Git. No había archivos que respaldar, aplicación, scripts, variables de entorno ni integraciones que conservar.

## Situación técnica · versión 0.5.0

Primera web estática local con Inicio, Aprende, Practica, Retos y Evaluación. Contenido separado en `js/content.js`, sin dependencias de producción, variables de entorno ni integraciones externas. Pizarras específicas por lección, secuencias por pasos, gráficos de práctica y logo del centro, retos con explicación y ficha de observación para 2×1 + 2×1 + 2×2. Las anotaciones no persisten al recargar.

La guía ajustada se respaldó en el commit `3ad3fca` antes de crear la web. RCP solo se consultó y no se modificó.

Validación: sintaxis, dos pruebas automatizadas y generación de `dist/` correctas. Navegación, cambio de lección, pizarra, recorrido completo del reto y edición de observaciones comprobados en navegador. Revisión de portada y sesiones a 390 px sin desbordamiento horizontal de página.

Límites de verificación: el navegador integrado ejecutó la solicitud de descarga CSV, pero no entregó el evento/archivo para verificar su guardado; la serialización CSV sí tiene prueba automatizada. El diálogo y resultado de impresión no se han verificado. No hay publicación externa: GitHub/Vercel quedan sin conectar; no bloquean el uso local.

## Mejoras aplicadas durante la revisión · 0.5.0

- Incorporar en la web el logo del IES María Soliño, disponible en los recursos de Educador RCP, manteniendo el balón de rugby. Aplicado en cabecera y pie; balón conservado.
- En Aprende, incorporar una pizarra específica de pasar y cruzar por parejas: ambos avanzan, uno pasa, quien recibe continúa avanzando y quien pasó cruza por detrás para volver a apoyar. Mostrar claramente el recorrido del balón y el de cada jugador. Aplicado.
- Incorporar también una pizarra de trenzas por tríos, mostrando la secuencia de pases y cruces por detrás. Presentar la pizarra adecuada al contenido, en el espacio donde ahora aparece siempre el 2×2. Aplicado.
- Corrección docente para la pizarra de fijación: A1 busca con intención el centro entre los dos defensores. A2 lee la situación: si A1 fija al impar, A2 se abre lateralmente; si fija al par, A2 cruza por detrás. Ajustar trayectorias, explicación y apoyo representado. Confirmado después por el docente: esta corrección corresponde a la lección 04, fijar al par o al impar (2×2). No trasladarla al 2×1. Aplicado en guía, contenido y pizarra.
- Cada contexto de Aprende debe tener su pizarra correspondiente: en la lección 03, Resolver un 2×1, representar dos atacantes y un solo defensor; en la 04, el 2×2 con las trayectorias corregidas. Evitar mostrar siempre la misma pizarra de 2×2. Aplicado.
- En Practica, añadir un esquema gráfico propio para cada actividad o progresión, dentro de su sesión: posiciones de jugadores, recorrido del balón y desplazamientos. Mantener el estilo visual de las pizarras y su correspondencia con la tarea. Aplicado.

Validación de esta revisión: pizarras de parejas y trenzas con cambio de fases comprobado en navegador; lección 03 con un solo defensor; lección 04 con cruce ante fijación al par y apertura ante fijación al impar. Logo presente en cabecera y pie. Las notas originales de voz se conservan en `backups/revision-voz-2026-10-09.md`.

Comprobación final: 17 esquemas repartidos entre las seis sesiones, secuencias de las pizarras operativas y revisión a 390 px sin desbordamiento horizontal. Sintaxis, tres pruebas automatizadas y generación de la web correctas.

## Solicitud de despliegue · pendiente de accesos

El usuario ha autorizado crear un repositorio GitHub y publicar en Vercel. Configuración estática preparada en `vercel.json`, validada localmente. GitHub requiere sesión de navegador para crear el repositorio; Vercel ha rechazado la creación en el equipo existente por autorización insuficiente del conector. No se ha creado repositorio ni proyecto remoto y no hay URL pública verificada. Detalle en `DESPLIEGUE.md`.

Actualización: el usuario ha creado `andopor/Educador-Rugby` (público). Repositorio confirmado vacío y remoto local conectado. Subida impedida por falta de autenticación local y rechazo de escritura del conector al nuevo repositorio. En Vercel, usar `educador-rugby`, sin mayúsculas ni espacios; pendiente subir archivos antes del despliegue.

Actualización de acceso: instalada la conexión ChatGPT Codex Connector; escritura GitHub verificada. Subida completa en curso; publicación Vercel todavía pendiente de comprobar. Historial previo conservado localmente.

Comprobación tras habilitar GitHub: tres pruebas, sintaxis y compilación correctas. Vercel sigue rechazando el acceso al equipo con 403; requiere completar la publicación desde el panel autorizado del usuario o reparar esa conexión.

Publicación GitHub completada: los 20 archivos del proyecto están en `andopor/Educador-Rugby`, rama `main`, commit inicial completo `fb50b3c`. Comparación con la copia local: contenido idéntico; únicamente difiere el modo ejecutable del SVG del logo, sin afectar a la web. El historial de trabajo local y el historial inicial de GitHub se conservan separados. Vercel continúa pendiente de acceso; no hay URL pública comprobada.

Publicación externa confirmada: https://educador-rugby.vercel.app responde HTTP 200; página, estilos, scripts principales, contenido, pizarras, logo y balón coinciden byte a byte con la compilación local. Publicación completada por el usuario. Acceso interno al panel mediante conector sigue bloqueado (403), por lo que la configuración de despliegue automático no queda confirmada.

## Pizarras animadas · 0.6.0

- Reproducción a petición, pausa, reanudación, inicio y tres velocidades en Aprende y Practica.
- Balón con transferencia al receptor y jugadores que siguen las trayectorias representadas. En par/impar, apoyo antes del pase.
- Secuencias de cruce, trenza y fijación por fases; 2×1 mantiene sus alternativas separadas. En lectura libre de 2×2 se elige par o impar; en tríos se elige apoyo.
- El circuito de evaluación conserva su esquema de organización estático. Solo una pizarra se reproduce a la vez; se detiene al cambiar de página o esconder la pestaña.
- Copia previa conservada en la rama respaldo/antes-reproduccion-pizarras-20261009.
- Validación en navegador: movimiento real del balón y jugadores, pausa estable, reanudación, pasos, final de trenza, cruce antes del pase, apertura al impar hasta finalizar y ancho móvil de 390 px sin desbordamiento. Sin errores de consola durante las comprobaciones.
- Son representaciones didácticas por fases, con recolocación entre pasos; no una simulación física continua ni una respuesta automática de los defensores.

Actualización 0.6.0 publicada en https://educador-rugby.vercel.app. Archivos CSS, aplicación, diagramas y reproducción comprobados contra dist local. Reproducción y pausa de jugadores comprobadas también en la web pública. El despliegue automático tras actualizar GitHub queda confirmado por esta publicación.

## Corrección reglamentaria y didáctica · 0.7.0

- Revisadas las leyes 10 y 11 de World Rugby para posición en juego, repliegue y dirección del pase; doble tap y sus reinicios siguen identificados como adaptación escolar pendiente de concretar.
- Recorridos, jugadores, posesión y tiempos explícitos en js/plays.js; eliminada la asignación de movimientos por proximidad a las flechas.
- Pase hacia atrás, repliegue de quien queda adelantado y avance del nuevo portador. Los apoyos pueden avanzar mientras permanecen por detrás; no se enseña inmovilidad obligatoria. Las pausas de las animaciones son didácticas.
- En parejas y trenzas, quien recibe avanza con balón hacia el centro. Posiciones y posesión enlazan entre fases sin recolocación instantánea.
- Fijar al impar: A1 busca el centro y compromete a D2; A2 se abre, recibe y supera la altura de D2 por la banda con balón. Respuestas defensivas ilustrativas, no garantizadas.
- Una pizarra 2×1 con elección entre fijar/pasar y aprovechar el espacio; eliminadas repeticiones dentro de las sesiones de 2×1 y trenzas.
- Línea dinámica del portador/último pasador y aviso de repliegue sin equiparar automáticamente una posición adelantada a una sanción.
- Ocho pruebas: contenido, CSV, defensores del 2×1, continuidad de posiciones/posesión, pases, posición y avance de apoyos (400 muestras por fase), búsqueda del centro, salida por banda y ausencia de duplicados.
- Verificación local de navegador: cruce completo con pausa/reanudación, final de trenza, alternativas 2×1 (2/4 pasos), final de impar con A2 y balón más allá de D2, un balón por pizarra, consola sin errores y ancho de 390 px sin desbordamiento.
- Copia anterior conservada en respaldo/antes-correccion-reglamento-20261009. RCP no se ha modificado.
- Publicación 0.7.0 confirmada en https://educador-rugby.vercel.app: archivos de jugadas, reproducción, presentación, contenido, aplicación, estilos y guía coinciden con dist local. Final de fijación al impar reproducido en navegador público con A2 en (360,55), D2 en (245,120) y balón junto a A2.

## Simplificación confirmada por el docente · 0.8.0

- Cruce por parejas reducido a un gesto completo de tres pasos: pase, cruce real por detrás y avance del receptor al centro. Eliminados los antiguos pasos 4–6.
- En 2×1 con pase y 2×2 par/impar, eliminado el retroceso posterior al pase. A1 permanece quieto, sin intervenir ni obstaculizar, mientras A2 progresa con balón y lo sobrepasa (puesta en juego por compañero, ley 10.7a).
- Conservados el cruce de A2 antes de recibir en fijación al par y su apertura y salida por banda en fijación al impar.
- Aviso específico de espera durante la posición adelantada y confirmación de puesta en juego cuando el portador sobrepasa al pasador. La espera no se presenta como autorización para interferir ni como norma general de todas las tareas.
- Textos, guía y pruebas ajustados a esta decisión docente. Copia anterior: respaldo/antes-simplificar-jugadas-20261009.
- Nueve pruebas, sintaxis y compilación correctas. Navegador: cruce con tres pasos; A1 inmóvil durante y al final de las salidas de 2×1, par e impar; aviso de espera seguido de puesta en juego. Consola sin errores.
- Publicación de la versión 0.8.0 preparada; verificar la URL tras actualizar GitHub.
