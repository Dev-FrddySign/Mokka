import Cabecera from './pages/navbar/Cabecera'
import Inicio from './pages/sections/Inicio'
import Cuerpo from './pages/sections/Cuerpo'
import Estructura from './pages/sections/Estructura'
import Team from './pages/sections/Team'
import Suscripcion from './pages/sections/Suscripcion'
import CartDrawer from './components/cart/CartDrawer'
import Footer from './components/footer/Footer'

function App() {
  return (
    <>
      <Cabecera />
      <Inicio />
      <Cuerpo />
      <Estructura />
      <Team />
      <Suscripcion />
      <CartDrawer />
      <Footer />
    </>
  )
}

export default App