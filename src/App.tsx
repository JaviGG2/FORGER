import { BrowserRouter, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Banner from './components/Banner'
import Home from './pages/Home'
import './css/estilos.css'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Banner/>
      <Home/>
      <main className="contenido">
        <Routes>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
