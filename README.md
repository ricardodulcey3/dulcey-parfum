# Dulcey Parfum

Landing page de perfumería de lujo (HTML/CSS/JS puro, sin build). Inspirada en la estructura de tiendas de perfumería online modernas: hero animado, marquee de marcas, manifiesto de marca, colecciones, catálogo filtrable con precios de oferta, sección "nosotros" con contadores animados, cita de marca y contacto directo por WhatsApp.

## Estructura

- `index.html` — Marcado y contenido de todas las secciones.
- `css/styles.css` — Estilos, variables de marca y animaciones (scroll reveal, marquee infinito, contadores, hover states).
- `js/script.js` — Datos de productos, filtros de catálogo, animaciones (`IntersectionObserver`), menú móvil y formulario de newsletter.

## Cómo verlo localmente

No requiere instalación. Abre `index.html` directamente en el navegador, o sirve la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

## Personalización

- Reemplaza `WHATSAPP_NUMBER` en `js/script.js` y los enlaces `wa.me/00000000000` en `index.html` por tu número real.
- Edita el arreglo `PRODUCTS` en `js/script.js` para tu catálogo real.
- Los colores de marca están centralizados como variables CSS en `:root` dentro de `css/styles.css`.
