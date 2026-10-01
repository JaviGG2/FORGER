import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CursorFollower from './CursorFollower'

export default function Layout() {
  return (
    <>
      <CursorFollower />
      <Header />
      <main className="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}