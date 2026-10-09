# Educador Rugby · 1.º ESO

Primera web local de rugby, inspirada en el diseño de Educador RCP. El proyecto RCP permanece independiente y sin modificaciones.

## Abrir la web

Desde esta carpeta, ejecutar `npm run dev` y abrir http://127.0.0.1:8086.
Se necesitan Python 3 y Node.js para los comandos de desarrollo. La web publicada funciona sin dependencias de producción. Los módulos requieren HTTP: no abrir `index.html` directamente desde el explorador de archivos.

## Recorrido

- Inicio: portada y tres ideas clave.
- Aprende: pizarras propias para pase, cruce, trenza, 2×1, fijación par/impar, doble tap y posición en juego; secuencias por pasos.
- Practica: seis sesiones basadas en la guía docente, con esquemas de las tareas y progresiones.
- Retos: seis preguntas, explicación, resultado y reinicio.
- Evaluación: dos líneas de 2×1 y una final de 2×2; seis aspectos, anotaciones, exportación CSV e impresión.

Las anotaciones solo viven en la pestaña actual. No se guardan en un servidor ni se recuperan al recargar. La ficha no solicita nombres. No hay escala, ponderaciones ni nota práctica automática.

## Archivos y comprobaciones

- `index.html`, `css/style.css`: presentación y diseño adaptable.
- `js/content.js`: lecciones, sesiones, preguntas e indicadores.
- `js/app.js`: navegación e interacciones.
- `js/diagrams.js`: escenas gráficas y controles de fases.
- `assets/logo-ies-maria-solino.svg`: identidad del centro, conservando el balón de rugby.
- `GUIA_DOCENTE.md`: referencia docente; al editarla, revisar también las sesiones de `js/content.js`.
- `ESTADO.md`, `VERSIONES.md`, `AGENTS.md`: seguimiento e instrucciones.

`npm run check` verifica sintaxis. `npm test` comprueba el contenido acordado y el escape del CSV. `npm run build` genera `dist/`, sin instalar paquetes. El proceso sustituye únicamente esa carpeta generada.

## Publicación

Esta versión es local. GitHub y Vercel no están conectados. Para alojarla como sitio estático puede publicarse `dist/`, generado con `npm run build`. No necesita variables de entorno, base de datos ni credenciales.

## Alcance del borrador

Confirmados: doble tap, parejas/cruces/trenzas, fijación par/impar y evaluación 2×1 + 2×1 + 2×2. Siguen provisionales: detalle del doble tap y reinicio, convención par/impar, distribución de sesiones, rotaciones y sistema de calificación. Las referencias deportivas figuran en la guía.

## Web publicada

[Educador Rugby](https://educador-rugby.vercel.app) · publicación y archivos principales comprobados el 9 de octubre de 2026.

## Pizarras · 0.7.0

Jugadas definidas en `js/plays.js`, presentación en `js/diagrams.js` y reproducción en `js/playback.js`. Las pruebas revisan toda la trayectoria de los apoyos, dirección de los pases y continuidad entre fases. Las pausas son didácticas y el doble tap es una adaptación escolar. Fuentes y criterios en GUIA_DOCENTE.md.
