# Scripts de Artículos — Fortius Consulting

Herramientas para importar artículos en formato Word (`.docx`) a la base de datos.

---

## Flujo completo

```
Archivos .docx  →  convert-articulos.mjs  →  articles.json  →  seed-articles.mjs  →  Supabase
```

O bien, desde el navegador sin tocar la terminal → ver [Interfaz web](#interfaz-web).

---

## 1. Requisitos previos (CLI)

| Requisito | Versión mínima |
|-----------|---------------|
| Node.js   | 18+           |
| pnpm      | 9+            |

Instalar dependencias desde la raíz del monorepo:

```bash
pnpm install
```

Configurar variables de entorno en `apps/web-fortius-consulting/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## 2. Estructura de carpetas para los documentos

Colocar los archivos `.docx` dentro de:

```
apps/web-fortius-consulting/public/articulos/
├── politica/          ← artículos de política
└── sociedad_civil/    ← artículos de sociedad civil
```

### Convención de nombres de archivo

```
YYYY_MM_DD. <TIPO> [(ABIERTO|PAGO)]. <Título>.docx
```

**Ejemplos:**

```
2025_03_15. Informe (PAGO). La nueva agenda de seguridad europea.docx
2025_04_02. Nota Inteligencia Política (ABIERTO). ¿Quién manda en Bruselas?.docx
2025_04_20. Eventos & Oportunidades. Cumbres clave de mayo.docx
```

**Tipos reconocidos:**

| Texto en el nombre             | `kind` resultante |
|--------------------------------|-------------------|
| `Informe`                      | `informe`         |
| `Nota Inteligencia Política`   | `nota`            |
| `Eventos & Oportunidades`      | `evento`          |
| `Comentario`                   | `comentario`      |
| (cualquier otro)               | `articulo`        |

**Acceso:**
- `(PAGO)` → sólo para socios (`access: "paid"`)
- `(ABIERTO)` o sin indicación → público (`access: "public"`)

---

## 3. Convertir: `.docx` → `articles.json`

```bash
cd apps/web-fortius-consulting
pnpm articulos:convert
```

Genera `src/data/articles.json` con todos los artículos convertidos a Markdown.

La consola muestra `✓` o `✗` por cada archivo procesado.

---

## 4. Subir a Supabase

```bash
cd apps/web-fortius-consulting
pnpm articulos:seed
```

- Idempotente: se puede ejecutar varias veces sin duplicar artículos (upsert por `slug`).
- Crea automáticamente la organización `fortius-consulting` si no existe.

---

## 5. Ejecutar los dos pasos de golpe

```bash
cd apps/web-fortius-consulting
pnpm articulos:convert ; pnpm articulos:seed
```

---

## Interfaz web

Para equipos sin acceso a la terminal, existe una herramienta web en:

```
https://tu-dominio.com/herramientas/articulos
```

Permite subir archivos `.docx` directamente desde el navegador sin instalar nada.
Ver instrucciones de uso en [/herramientas/articulos](#).

> **Nota de despliegue:** Para que la interfaz web funcione en producción (Vercel),
> `mammoth` y `turndown` deben estar en `dependencies` (no `devDependencies`)
> del `package.json` de esta app.

---

## Estructura del JSON generado

Cada artículo en `articles.json` tiene la siguiente forma:

```jsonc
{
  "slug": "2025-03-15-la-nueva-agenda-de-seguridad-europea",
  "title": "La nueva agenda de seguridad europea",
  "category": "politica",          // "politica" | "sociedad-civil" | "home"
  "kind": "informe",               // "informe" | "nota" | "evento" | "comentario" | "articulo"
  "access": "paid",                // "public" | "paid"
  "published_at": "2025-03-15",
  "excerpt": "Primer párrafo del artículo…",
  "content_markdown": "## Introducción\n\n…",
  "subproducts": [],               // secciones extra para artículos de pago
  "source_file": "public/articulos/politica/2025_03_15.Informe (PAGO)…docx"
}
```

---

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---------|---------------|----------|
| `✗ archivo.docx: Cannot find module 'mammoth'` | Dependencias no instaladas | `pnpm install` en la raíz |
| `Missing NEXT_PUBLIC_SUPABASE_URL` | Falta el `.env.local` | Crear el archivo con las variables |
| El título sale con guiones bajos | Nombre de archivo con `_` en el título | Usar espacios o `.` como separadores |
| Slug duplicado | Dos archivos generan el mismo slug | El script añade sufijo `-2`, `-3`, etc. automáticamente |
| Imágenes no aparecen | Word incrusta las imágenes como base64 | Las imágenes se omiten; subir manualmente a Supabase Storage |
