# Convertidor de Entradas — Fortius Fundación

Convierte los artículos en formato `.docx` de la carpeta `public/entradas/` a un archivo TypeScript (`src/content/articles.ts`) que la web consume directamente.

---

## ¿Cuándo lo necesitas?

Cada vez que añadas, edites o elimines un artículo en la carpeta `public/entradas/`, hay que regenerar `articles.ts`. Tienes **tres formas** de hacerlo, ordenadas de más fácil a más técnica:

| Opción | Para quién | Requiere |
|--------|-----------|----------|
| [**A) Herramienta web en el navegador**](#opción-a-herramienta-web-sin-instalación) | Cualquier persona | Solo un navegador |
| [**B) GitHub Actions**](#opción-b-github-actions-flujo-recomendado) | Quien tenga acceso a GitHub | Acceso al repositorio |
| [**C) Script de Python**](#opción-c-script-de-python-avanzado) | Desarrolladores | Python 3.9+ instalado |

---

## Cómo deben llamarse los archivos

**Formato obligatorio del nombre:**

```
AAAA_MM_DD. Título del artículo.docx
```

Ejemplos correctos:
```
2024_06_06. Historia de dos ciudades.docx
2025_01_15. 2025 en 3 retos.docx
```

> El punto (`.`) entre la fecha y el título es obligatorio. La fecha se usa para ordenar los artículos.

---

## Estructura interna del .docx

El script lee el documento párrafo a párrafo. El orden importa:

| Posición | Contenido |
|----------|-----------|
| Primer párrafo | **Título** del artículo (puede coincidir con el nombre del archivo) |
| `Autor: Nombre Apellido` | Atribuye autoría. Si no existe, queda en `null` |
| `Fecha: DD/MM/AAAA` | Se ignora (la fecha se toma del nombre del archivo) |
| Resto de párrafos | **Cuerpo** del artículo |

---

## Opción A: Herramienta web (sin instalación)

Esta es la opción más sencilla. No requiere Python, Node.js ni ninguna instalación.

1. Abre el archivo `scripts/converter.html` **haciendo doble clic** sobre él (se abre en tu navegador).
2. Arrastra tus archivos `.docx` a la zona indicada (o haz clic para seleccionarlos).
3. Revisa la tabla de vista previa para confirmar que la conversión es correcta.
4. Haz clic en **"Descargar articles.ts"**.
5. Copia el archivo descargado a `src/content/articles.ts` reemplazando el existente.
6. Haz commit y push del archivo.

> La herramienta funciona completamente en el navegador: **ningún dato sale de tu ordenador**.

---

## Opción B: GitHub Actions (flujo recomendado)

El repositorio tiene un workflow que convierte los `.docx` y actualiza `articles.ts` automáticamente. Solo necesitas subir los archivos a GitHub.

### Automáticamente (al hacer push):

1. Ve al repositorio en GitHub.
2. Navega a `apps/web-fortius-foundation/public/entradas/`.
3. Haz clic en **"Add file" → "Upload files"**.
4. Arrastra los `.docx` y haz clic en **"Commit changes"**.
5. El workflow se ejecuta automáticamente. En ~1-2 minutos verás el commit con `articles.ts` actualizado.

### Manualmente (desde la pestaña Actions):

1. Ve a **Actions** → **"Convertir entradas — Fortius Fundación"**.
2. Haz clic en **"Run workflow"** → **"Run workflow"**.
3. Espera a que termine (icono verde = éxito).

---

## Opción C: Script de Python (avanzado)

### Requisitos

- Python 3.9 o superior (sin librerías externas — usa solo la librería estándar)

### Cómo ejecutarlo

```bash
# Desde la raíz del monorepo:
cd apps/web-fortius-foundation
python scripts/convert-entradas.py
```

### Salida

```
✅ 15 entradas convertidas → src/content/articles.ts
```

El archivo `src/content/articles.ts` se genera (o sobreescribe) automáticamente.

---

## Resolución de problemas

### El archivo no aparece en la lista convertida

Verifica que el nombre sigue el formato `AAAA_MM_DD. Título.docx`. Si el nombre tiene un formato distinto, el script lo saltará y mostrará un error en la consola.

### El título aparece como el nombre del archivo

Significa que el primer párrafo del `.docx` estaba vacío. Asegúrate de que el documento empieza con el título del artículo sin líneas en blanco antes.

### El autor aparece como `null`

El documento no tiene una línea `Autor: Nombre`. Añade esa línea justo debajo del título.
