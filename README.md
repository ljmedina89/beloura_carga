# Beloura Carga

Sitio estatico de Beloura para tracking, afiliados, operadores, paneles internos y paginas comerciales.

## Dominio

GitHub Pages usa el archivo `CNAME` con:

```text
trk.belourastore.com
```

## Paginas principales

- `index.html`: pagina publica principal.
- `afiliados.html`: registro y recuperacion de PIN para afiliados.
- `partner.html`: dashboard de afiliados.
- `operador.html`: dashboard de operadores.
- `admin.html`: dashboard administrativo.
- `assistant.html`: asistente independiente.
- `folleto.html`: landing comercial para partners.

## Desarrollo local

Puedes servir el sitio desde la raiz del repo:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Notas tecnicas

- Mantener solo `CNAME`; no crear variantes como `cname`, porque en Windows chocan por mayusculas/minusculas.
- Las rutas internas publicas deben apuntar a archivos reales (`afiliados.html`, `partner.html`) para evitar 404 en GitHub Pages.
- No guardar PINs permanentes en `localStorage`; si se necesita mantener sesion, preferir `sessionStorage` o reautenticacion.
- `admin.html` contiene una clave administrativa en el frontend. Para seguridad real, esa autorizacion debe moverse al backend o a un proxy autenticado; en HTML estatico cualquier visitante puede ver el codigo fuente.
