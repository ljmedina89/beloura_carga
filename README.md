# Beloura Carga

Sitio estatico de Beloura para tracking, afiliados, operadores, paneles internos y paginas comerciales.

## Dominio

GitHub Pages usa el archivo `CNAME` con:

```text
trk.belourastore.com
```

## Paginas principales

- `index.html`: pagina publica principal.
- `cliente.html`: casillero privado con registro y login por cliente/casillero + PIN.
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
- `beloura-public-config.js` centraliza la URL publica del Apps Script y la URL base de tracking. Si se redepliega el script, se cambia ahi y no pagina por pagina.
- `beloura-admin-config.js` centraliza la URL administrativa y la clave actual. Es una medida de orden, no de seguridad real: en HTML estatico cualquier visitante puede ver el codigo fuente.

## Estado operativo actual

- El tracking publico y los QR de guias deben consultar por `CodigoEnvio` individual (`NY...`), incluso cuando varios envios compartan una guia consolidada (`GNY...`).
- La guia consolidada sirve para agrupar paquetes; el tracking individual sirve para que cada cliente vea solo su envio.
- `cliente.html` usa `clienteLogin`, `clienteEnvios` y `registrarClienteCasillero`. Los envios por cliente requieren PIN; el tracking publico solo debe consultar codigos de envio individuales (`NY...`) o guias.
- La hoja `CLIENTES` contempla casilleros privados con `NumeroCasillero`, `PIN`, `EstadoCasillero`, `FechaAltaCasillero` y `UltimoAcceso`.
- La hoja `ENVIOS` ya contempla campos para documentos: `FacturaURL`, `FotoPaqueteURL`, `FacturaEstado`, `FechaFactura` y `ArchivoSubidoPor`.
- El modulo de configuracion del admin mantiene textos de guia, bodega, sitio web, URL de tracking, precios base, metodos de pago, estados y opciones operativas.

## Ruta recomendada hacia homelab

1. Mantener GitHub Pages como frontend publico mientras el volumen valida el negocio.
2. Agregar un proxy pequeno en el homelab para ocultar la clave administrativa y controlar permisos.
3. Exponer el proxy con tunel seguro, no abriendo puertos directos del router.
4. Pasar gradualmente de Google Sheets a una base de datos cuando el volumen o la auditoria lo pidan.
5. Dejar Apps Script como respaldo temporal durante la migracion.
