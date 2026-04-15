import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CartPreview() {

    const { cart, setOpen } = useCart();
    const [openPreview, setOpenPreview] = useState(false);

    const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);

    const parsePrice = (price) =>
        Number(price.replace('$', '').replace(/\./g, ''));

    const subtotal = cart.reduce(
        (acc, item) => acc + parsePrice(item.price) * item.quantity,
        0
    );

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpenPreview(true)}
            onMouseLeave={() => setOpenPreview(false)}
        >

            <button 
                onClick={() => setOpen(true)}
                className="text-xl cursor-pointer"
            >
                🛒
            </button>

            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                    {totalItems}
                </span>
            )}

            <div
                className={`absolute right-0 mt-4 w-72
                bg-white text-black rounded-xl shadow-xl
                transition-all duration-300
                ${openPreview ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >

                <div className="p-3 font-semibold border-b">
                    Tu carrito
                </div>

                <div className="max-h-52 overflow-y-auto">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between p-3 text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>
                                ${(parsePrice(item.price) * item.quantity).toLocaleString('es-CL')}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="p-3 border-t text-sm">
                    <p>Subtotal: ${subtotal.toLocaleString('es-CL')}</p>
                    <p>IVA: ${iva.toLocaleString('es-CL')}</p>
                    <p className="font-bold">Total: ${total.toLocaleString('es-CL')}</p>
                </div>

                <div className="p-3">
                    <button
                        onClick={() => setOpen(true)}
                        className="w-full bg-green-700 text-white py-2 rounded"
                    >
                        Ir al checkout
                    </button>
                </div>

            </div>
        </div>
    );
}