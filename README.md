# kikisito.com

Sitio web personal y portafolio construido con **Nuxt 4**, **Vue 3**, **Tailwind CSS** y **Nuxt UI**. Muestra mis proyectos, experiencia profesional, tecnologías utilizadas e información de contacto.
## Desarrollo

- **Framework**: Nuxt 4 con Vue 3
- **Styling**: Tailwind CSS 4
- **Componentes UI**: Nuxt UI
- **Gestión de Contenido**: Nuxt Content
- **Iconos**: Nuxt Icon con Lucide y Simple Icons
- **Imágenes**: Nuxt Image
- **Lenguaje**: TypeScript
- **Gestor de paquetes**: pnpm
- **Despliegue**: Docker + GitHub Actions

## Instalación

Instala las dependencias:

```bash
pnpm install
```

## Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
pnpm dev
```

## Construcción

Build para producción:

```bash
pnpm build
```

Vista previa local del build:

```bash
pnpm preview
```

## Estructura del Proyecto

```
├── app/
│   ├── components/       # Componentes varios
│   ├── pages/            # Páginas de la aplicación
│   ├── layouts/          # Layouts
│   ├── assets/           # Estilos y assets
│   ├── utils/            # Utilidades
│   └── types/            # Tipos TypeScript
├── content/
│   └── projects/         # Datos JSON de proyectos
├── compose.yml           # Configuración Docker
├── nuxt.config.ts        # Configuración de Nuxt
├── package.json          # Dependencias
└── tsconfig.json         # Configuración TypeScript
```

## Despliegue

### Docker

El proyecto se construye automáticamente como imagen Docker con GitHub Actions y se despliega a producción.

Para ejecutar localmente se debe ejecutar `docker-compose up`. De esta manera, la aplicación estará disponible en `http://localhost:80`

### GitHub Actions

El workflow de despliegue automatiza:
- Construcción de la imagen Docker
- Subida a GitHub Container Registry (GHCR)
- Despliegue a producción
