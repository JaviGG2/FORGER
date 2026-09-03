import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Banner from './components/Banner'
import Home from './pages/Home'
import Productos from './pages/Productos'
import ProductoTwin from './pages/ProductoTwin'
import ProductoGuru from './pages/ProductoGuru'
import ProductoBoss from './pages/ProductoBoss'
import Eventos from './pages/eventos/Eventos'
import EventoForgerLan from './pages/eventos/EventoForgerLive'

import './css/estilos.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<><Banner /><Home /></>} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/twin" element={<ProductoTwin />} />
          <Route path="/productos/guru" element={<ProductoGuru />} />
          <Route path="/productos/boss" element={<ProductoBoss />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/forger-lan-2026" element={<EventoForgerLan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}