# GUIA WEB - Crear web informativa FORGER paso a paso

Guia para transformar esta web en una web informativa tipo Apple
con React + Vite. Segui cada paso en orden.

---

## PASO 0: Entender la estructura

Tu proyecto tiene esta estructura:

```
src/
  main.jsx          → Punto de entrada (NO tocar)
  App.jsx           → Define las rutas (que pagina se ve en cada URL)
  datos.js          → Datos de la web (productos, links, etc)
  estilos.css       → Todos los estilos CSS
  components/       → Componentes reutilizables (Header, Footer)
  pages/            → Las paginas de la web (Home, Productos, etc)
public/
  fonts/            → Fuentes tipograficas (American Captain)
```

**Como funciona React:**
- `main.jsx` busca el `<div id="root">` en index.html y dibuja ahi
- `App.jsx` define que pagina se muestra segun la URL
- Cada pagina es un componente en `src/pages/`
- Los datos estan en `datos.js` para facilitar cambios

---

## PASO 1: Limpiar archivos innecesarios

Elimina estos archivos que no vamos a usar:

```
GUIA_DIRECTOS.md
GUIA_SIMPLE.md
GUIA_TV.md
public/videos/
src/pages/Countdown.jsx
src/pages/Demo.jsx
```

**Como hacerlo:**
- Click derecho > Eliminar (o seleccionar y tecla Delete)

---

## PASO 2: Crear datos.js

Reemplaza **TODO** el contenido de `src/datos.js` con este codigo:

```js
export const productos = [
  {
    id: 'forgenex-4090',
    nombre: 'FORGE NEX 4090',
    categoria: 'hardware',
    precio: '$1,299',
    descripcion: 'Tarjeta grafica de ultima generacion para gaming extremo.',
    imagen: '/productos/gpu.jpg',
    specs: ['24GB GDDR6X', '16384 CUDA Cores', '2.52 GHz Boost', 'Ray Tracing 3ra Gen']
  },
  {
    id: 'forgestrike-pro',
    nombre: 'FORGESTRIKE PRO',
    categoria: 'hardware',
    precio: '$189',
    descripcion: 'Teclado mecanico con switches propios y RGB personalizable.',
    imagen: '/productos/teclado.jpg',
    specs: ['Switches FORGER Red', 'Aluminio CNC', 'RGB por tecla', 'USB-C']
  },
  {
    id: 'forgeos-lite',
    nombre: 'FORGEOS LITE',
    categoria: 'software',
    precio: '$49',
    descripcion: 'Software de optimizacion para gaming. Overclock seguro y monitoreo.',
    imagen: '/productos/software.jpg',
    specs: ['Overclock automatico', 'Monitoreo en tiempo real', 'Perfiles de juego', '1 ano de actualizaciones']
  },
  {
    id: 'forgepulse-x',
    nombre: 'FORGEPULSE X',
    categoria: 'hardware',
    precio: '$79',
    descripcion: 'Mouse ultraligero con sensor de 25K DPI y cuerpo ergonomico.',
    imagen: '/productos/mouse.jpg',
    specs: ['25K DPI', '58g peso', '8 botones', 'Cable paracord']
  }
]

export const navLinks = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/productos', texto: 'Productos' }
]
```

**Que hace este archivo:**
- `productos`: Array con 4 productos de ejemplo. Cada uno tiene:
  - `id`: identificador unico (se usa en la URL)
  - `nombre`: nombre para mostrar
  - `categoria`: 'hardware' o 'software'
  - `precio`: precio en texto
  - `descripcion`: texto largo
  - `imagen`: ruta a la imagen (en public/)
  - `specs`: array de especificaciones tecnicas
- `navLinks`: links del menu de navegacion

---

## PASO 3: Crear Header.jsx

Crea un archivo nuevo: `src/components/Header.jsx`

Copia este contenido:

```jsx
import { Link } from 'react-router-dom'
import { navLinks } from '../datos.js'

export default function Header() {
  return (
    <header className="header">
      <div className="contenedor header-interno">
        <Link to="/" className="header-logo">FORGER</Link>
        <nav className="header-nav">
          {navLinks.map(link => (
            <Link key={link.ruta} to={link.ruta} className="header-link">
              {link.texto}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

**Que hace este componente:**
- Muestra una barra de navegacion fija arriba (sticky)
- A la izquierda: logo "FORGER" que lleva al inicio
- A la derecha: links de navegacion que vienen de datos.js
- Usa `Link` de react-router para navegar sin recargar la pagina

---

## PASO 4: Crear Footer.jsx

Reemplaza **TODO** el contenido de `src/components/Footer.jsx` con:

```jsx
import { navLinks } from '../datos.js'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="pie">
      <div className="contenedor pie-interno">
        <div className="pie-marca">FORGER</div>
        <nav className="pie-nav">
          {navLinks.map(link => (
            <Link key={link.ruta} to={link.ruta}>{link.texto}</Link>
          ))}
        </nav>
      </div>
      <div className="contenedor pie-final">
        <span>© 2026 FORGER</span>
      </div>
    </footer>
  )
}
```

**Que hace:**
- Footer simple con marca FORGER a la izquierda
- Links de navegacion a la derecha
- Copyright abajo

---

## PASO 5: Crear Home.jsx

Crea un archivo nuevo: `src/pages/Home.jsx`

Copia este contenido:

```jsx
import { Link } from 'react-router-dom'
import { productos } from '../datos.js'

export default function Home() {
  const destacados = productos.slice(0, 3)

  return (
    <>
      <section className="hero">
        <h1 className="hero-titulo">FORGER</h1>
        <p className="hero-sub">Hardware forjado para jugar en serio</p>
        <Link to="/productos" className="hero-btn">Ver productos</Link>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2 className="seccion-titulo">Destacados</h2>
          <div className="grid-productos">
            {destacados.map(p => (
              <Link key={p.id} to={`/producto/${p.id}`} className="card">
                <div className="card-img">{p.nombre}</div>
                <h3 className="card-nombre">{p.nombre}</h3>
                <p className="card-precio">{p.precio}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

**Que hace:**
- Muestra un hero grande con titulo FORGER y subtitulo
- Boton "Ver productos" que lleva a /productos
- Seccion "Destacados" con las primeras 3 tarjetas de productos
- Cada tarjeta es un link al detalle del producto

---

## PASO 6: Crear Productos.jsx

Crea un archivo nuevo: `src/pages/Productos.jsx`

Copia este contenido:

```jsx
import { Link } from 'react-router-dom'
import { productos } from '../datos.js'

export default function Productos() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <h1 className="pagina-titulo">Productos</h1>
        <div className="grid-productos">
          {productos.map(p => (
            <Link key={p.id} to={`/producto/${p.id}`} className="card">
              <div className="card-img">{p.nombre}</div>
              <h3 className="card-nombre">{p.nombre}</h3>
              <p className="card-precio">{p.precio}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Que hace:**
- Pagina con titulo "Productos"
- Grid con todos los productos (los 4)
- Cada tarjeta es un link al detalle

---

## PASO 7: Crear Producto.jsx

Crea un archivo nuevo: `src/pages/Producto.jsx`

Copia este contenido:

```jsx
import { useParams, Link } from 'react-router-dom'
import { productos } from '../datos.js'

export default function Producto() {
  const { id } = useParams()
  const producto = productos.find(p => p.id === id)

  if (!producto) {
    return (
      <section className="seccion">
        <div className="contenedor">
          <h1 className="pagina-titulo">Producto no encontrado</h1>
          <Link to="/productos" className="hero-btn">Volver a productos</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="seccion">
      <div className="contenedor">
        <Link to="/productos" className="volver">← Volver</Link>
        <div className="detalle">
          <div className="detalle-img">{producto.nombre}</div>
          <div className="detalle-info">
            <h1 className="detalle-nombre">{producto.nombre}</h1>
            <p className="detalle-precio">{producto.precio}</p>
            <p className="detalle-desc">{producto.descripcion}</p>
            <ul className="detalle-specs">
              {producto.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Que hace:**
- Toma el `id` de la URL (ej: `/producto/forgenex-4090`)
- Busca ese producto en el array de datos.js
- Si no existe, muestra "Producto no encontrado"
- Si existe, muestra: imagen, nombre, precio, descripcion y specs
- Boton "Volver" para regresar a la lista

---

## PASO 8: Actualizar App.jsx

Reemplaza **TODO** el contenido de `src/App.jsx` con:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Producto from './pages/Producto.jsx'
import './estilos.css'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
```

**Que hace:**
- Importa todos los componentes
- Define las rutas:
  - `/` → Home
  - `/productos` → Productos
  - `/producto/:id` → Producto (el :id es un parametro dinamico)
  - `*` → cualquier otra URL lleva a Home
- Muestra Header arriba y Footer abajo en todas las paginas

---

## PASO 9: Reescribir estilos.css

Reemplaza **TODO** el contenido de `src/estilos.css` con:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@font-face {
  font-family: 'American Captain';
  src: url('/fonts/AmericanCaptain.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  --fondo: #000;
  --fondo-suave: #0a0a0a;
  --tinta: #fff;
  --tinta-suave: #888;
  --linea: rgba(255,255,255,0.12);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', sans-serif;
  background: var(--fondo);
  color: var(--tinta);
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: 'American Captain', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }

#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contenido { flex: 1; }

.contenedor {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--linea);
}

.header-interno {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.header-logo {
  font-family: 'American Captain', sans-serif;
  font-size: 24px;
  letter-spacing: 0.06em;
}

.header-nav { display: flex; gap: 32px; }

.header-link {
  font-size: 14px;
  color: var(--tinta-suave);
  transition: color 0.2s;
}

.header-link:hover { color: var(--tinta); }

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 80px 24px;
}

.hero-titulo {
  font-size: clamp(64px, 15vw, 160px);
  letter-spacing: 0.06em;
}

.hero-sub {
  font-size: 20px;
  color: var(--tinta-suave);
  margin-top: 16px;
}

.hero-btn {
  display: inline-block;
  margin-top: 32px;
  padding: 14px 32px;
  background: var(--tinta);
  color: var(--fondo);
  font-family: 'American Captain', sans-serif;
  font-size: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 8px;
  transition: opacity 0.2s;
}

.hero-btn:hover { opacity: 0.85; }

/* Secciones */
.seccion { padding: 80px 0; }

.seccion-titulo, .pagina-titulo {
  font-size: clamp(36px, 6vw, 56px);
  margin-bottom: 48px;
}

/* Grid de productos */
.grid-productos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  background: var(--fondo-suave);
  border: 1px solid var(--linea);
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--tinta-suave);
}

.card-img {
  width: 100%;
  height: 200px;
  background: #111;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'American Captain', sans-serif;
  font-size: 20px;
  color: var(--tinta-suave);
  margin-bottom: 20px;
}

.card-nombre { font-size: 20px; margin-bottom: 8px; }

.card-precio {
  font-size: 16px;
  color: var(--tinta-suave);
}

/* Detalle de producto */
.volver {
  display: inline-block;
  margin-bottom: 32px;
  color: var(--tinta-suave);
  font-size: 14px;
  transition: color 0.2s;
}

.volver:hover { color: var(--tinta); }

.detalle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

.detalle-img {
  width: 100%;
  height: 400px;
  background: #111;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'American Captain', sans-serif;
  font-size: 28px;
  color: var(--tinta-suave);
}

.detalle-nombre {
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 16px;
}

.detalle-precio {
  font-size: 24px;
  color: var(--tinta-suave);
  margin-bottom: 24px;
}

.detalle-desc {
  font-size: 16px;
  color: var(--tinta-suave);
  margin-bottom: 32px;
  line-height: 1.7;
}

.detalle-specs {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detalle-specs li {
  padding: 12px 16px;
  background: var(--fondo-suave);
  border: 1px solid var(--linea);
  border-radius: 8px;
  font-size: 14px;
}

/* Footer */
.pie {
  border-top: 1px solid var(--linea);
}

.pie-interno {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;
}

.pie-marca {
  font-family: 'American Captain', sans-serif;
  font-size: 28px;
  letter-spacing: 0.06em;
}

.pie-nav { display: flex; gap: 24px; }

.pie-nav a {
  font-size: 14px;
  color: var(--tinta-suave);
}

.pie-nav a:hover { color: var(--tinta); }

.pie-final {
  border-top: 1px solid var(--linea);
  padding: 16px 0 24px;
  font-size: 12px;
  color: var(--tinta-suave);
}

/* Responsive */
@media (max-width: 800px) {
  .detalle { grid-template-columns: 1fr; gap: 32px; }
  .pie-interno { flex-direction: column; gap: 16px; }
}

@media (max-width: 480px) {
  .header-nav { gap: 20px; }
  .header-link { font-size: 13px; }
  .grid-productos { grid-template-columns: 1fr; }
}
```

**Que hace este CSS:**
- Tema oscuro (fondo negro, texto blanco)
- Header sticky con efecto blur
- Hero centrado con boton
- Grid responsive de tarjetas de producto
- Detalle de producto en 2 columnas
- Se adapta a movil (responsive)

---

## PASO 10: Actualizar index.html

Abre `index.html` en la raiz del proyecto.

Cambia el `<title>`:
```html
<title>FORGER</title>
```

Cambia la meta description:
```html
<meta name="description" content="FORGER · Hardware forjado para jugar en serio." />
```

---

## PASO 11: Probar

Ejecuta en la terminal:

```bash
npx vite
```

Abre http://localhost:5173 y verifica:
- [ ] Home muestra hero + 3 productos destacados
- [ ] Click en "Productos" muestra los 4 productos
- [ ] Click en un producto muestra su detalle
- [ ] Click en "Volver" regresa a la lista
- [ ] Header y Footer se ven en todas las paginas

---

## PASO 12: Agregar imagenes (opcional)

1. Coloca tus imagenes en `public/productos/`
2. Actualiza el campo `imagen` en `src/datos.js` con el nombre correcto
3. En los archivos `.jsx`, cambia los divs por imagenes:

Antes:
```jsx
<div className="card-img">{p.nombre}</div>
```

Despues:
```jsx
<img src={p.imagen} alt={p.nombre} className="card-img" />
```

Y en Producto.jsx:
Antes:
```jsx
<div className="detalle-img">{producto.nombre}</div>
```

Despues:
```jsx
<img src={producto.imagen} alt={producto.nombre} className="detalle-img" />
```

---

## Estructura final

```
src/
  main.jsx          (sin cambios)
  App.jsx           (rutas: /, /productos, /producto/:id)
  datos.js          (4 productos + navLinks)
  estilos.css       (tema oscuro responsive)
  components/
    Header.jsx      (navbar sticky)
    Footer.jsx      (footer simple)
  pages/
    Home.jsx        (hero + destacados)
    Productos.jsx   (grid completo)
    Producto.jsx    (detalle individual)
```

---

## Personalizar

### Cambiar productos
Edita `src/datos.js` y modifica el array `productos`.

### Cambiar colores
Edita las variables CSS al inicio de `src/estilos.css`:
```css
:root {
  --fondo: #000;        /* color de fondo */
  --fondo-suave: #0a0a0a; /* fondo de tarjetas */
  --tinta: #fff;         /* color de texto */
  --tinta-suave: #888;   /* texto secundario */
  --linea: rgba(255,255,255,0.12); /* bordes */
}
```

### Agregar mas productos
Agrega un objeto mas al array `productos` en datos.js con la misma estructura.

### Cambiar fuentes
- Titulos: cambia `font-family` en los selectores `h1, h2, h3`
- Texto: cambia `font-family` en el selector `body`
