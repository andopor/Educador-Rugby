# Publicación · Educador Rugby

## Destinos previstos

- GitHub: cuenta `andopor`, repositorio `Educador-Rugby`, creado por el usuario como público.
- Vercel: equipo existente `andopors-projects`, proyecto nuevo `educador-rugby`.
- Rama de producción: `main`.

Repositorio confirmado: https://github.com/andopor/Educador-Rugby. Conexión de escritura habilitada; versión completa preparada para su publicación en main. El remoto local `origin` apunta a ese repositorio. No existe aún una URL de producción verificada.

## Configuración preparada

`vercel.json` declara una web estática, comando `npm run build`, salida `dist` y sin instalación de dependencias. No necesita variables de entorno ni base de datos.

Validación local antes de publicar: `npm run check`, `npm test` y `npm run build`, correctos el 9 de octubre de 2026.

## Accesos pendientes

- GitHub: el usuario instaló ChatGPT Codex Connector y la escritura funciona. Publicación mediante el conector; Git local sigue sin autenticación. El historial previo permanece conservado localmente.
- Vercel: el conector consulta la cuenta y los proyectos existentes, pero el acceso a `andopors-projects` sigue rechazado por autorización insuficiente (403, comprobado de nuevo tras habilitar GitHub). No hay CLI de Vercel instalada para usar otro acceso ya configurado.

Completar el acceso a GitHub en el navegador y disponer de una conexión de Vercel con permiso de escritura sobre ese equipo (o una sesión autorizada en su panel). No compartir contraseñas ni tokens en el chat.

## Secuencia al disponer de acceso

1. Repositorio creado por el usuario; historial previo preservado localmente.
2. Remoto propio añadido; subir la versión completa a `main` mediante el conector.
3. Importar ese repositorio en Vercel, en el equipo indicado, sin modificar otros proyectos.
4. Publicar producción y comprobar el estado del despliegue, la URL y los recursos gráficos.
5. Guardar aquí y en README los enlaces reales y el estado de la conexión automática con GitHub.

## Formulario Vercel

Nombre válido: `educador-rugby` (minúsculas y guion, sin espacios). Raíz `./`, preset Other. No desplegar desde el repositorio vacío: primero subir los archivos.
