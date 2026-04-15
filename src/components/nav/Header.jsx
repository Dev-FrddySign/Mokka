import { useCart } from '../../context/CartContext'
import CartPreview from '../cart/CartPreview'
import cafe from '../../assets/logo/cafe.png'

const Header = () => {

    const { setOpen, cart } = useCart()
    const totalItems = cart.reduce((a, b) => a + b.quantity, 0)
    {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
        {totalItems}
    </span>
)}

    return (
        <header className="fixed top-0 w-full z-50 bg-[#0F3D2E]/70 backdrop-blur-lg text-white">

            <div className="grid grid-cols-3 items-center px-8 py-4">

                <nav className="flex gap-6 text-sm">
                    <a href="#cafe">Café</a>
                    <a href="#sobre">Sobre Nosotros</a>
                    <a href="#suscripcion">Suscripción</a>
                </nav>

                <div className="flex justify-center">
                    <a href="#inicio">
                        <img src={cafe} className="w-10 h-10 cursor-pointer" />
                    </a>
                </div>

                <div className="flex justify-end relative">
                    {/* <button onClick={() => setOpen(true)} className="text-xl cursor-pointer">
                        🛒
                    </button>

                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                            {totalItems}
                        </span>
                    )} */}
                    <div className="flex justify-end">
                    <CartPreview />
                </div>
                </div>

            </div>
        </header>
    )
}

export default Header