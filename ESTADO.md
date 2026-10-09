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
