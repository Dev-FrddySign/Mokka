import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

function getCardType(cardNumber) {
    const number = cardNumber.replace(/\s+/g, '')
    if (/^4/.test(number)) return "visa"
    if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/.test(number)) return "mastercard"
    if (/^3[47]/.test(number)) return "amex"
    return "unknown"
}

export default function CartDrawer() {

    const { open, setOpen, cart, removeItem, updateQuantity, clearCart } = useCart()

    const [checkout, setCheckout] = useState(false)
    const [paid, setPaid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [boletaNum, setBoletaNum] = useState(1)
    const [tipType, setTipType] = useState(0)

    const [name, setName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardType, setCardType] = useState('unknown')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')

    const [cartSnapshot, setCartSnapshot] = useState([])

    const parsePrice = (price) =>
        Number(price.replace('$', '').replace(/\./g, ''))

    const subtotal = cart.reduce(
        (acc, item) => acc + parsePrice(item.price) * item.quantity,
        0
    )

    const iva = subtotal * 0.19
    const tip = subtotal * tipType
    const total = subtotal + iva + tip

    const handleClose = () => {
        setOpen(false)
        setCheckout(false)
        setPaid(false)
        setLoading(false)
    }

    const handlePayment = () => {

        if (!name || !cardNumber || !expiry || !cvv) {
            alert("Completa todos los campos")
            return
        }

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setPaid(true)

            setCartSnapshot(cart)

            
            clearCart()

        }, 4000)
    }

    const downloadBill = () => {

        const today = new Date().toLocaleDateString("es-CL")

        const win = window.open('', '', 'width=400,height=700')

        const html = `
        <html>
        <head>
            <style>
                body { font-family: monospace; padding:20px }
                .center { text-align:center }
                .line { border-top:1px dashed #000; margin:10px 0 }
                .row { display:flex; justify-content:space-between; font-size:12px }
            </style>
        </head>
        <body>

        <div class="center">
            <p>R.U.T.: 75.123.652-9</p>
            <p><b>BOLETA ELECTRÓNICA</b></p>
            <p>N° ${String(boletaNum).padStart(5, "0")}</p>
        </div>

        <div class="center">
            <p>S.I.I. - Mokka</p>
            <p>grupo numero 2 spa</p>
            <p>Av. Los Carrera 191, Quilpué, Valparaíso</p>
            <p>Emisión: ${today}</p>
        </div>

        <div class="line"></div>

        ${cartSnapshot.map(item => `
            <div class="row">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(parsePrice(item.price) * item.quantity).toLocaleString('es-CL')}</span>
            </div>
        `).join('')}

        <div class="line"></div>

        <div class="row"><span>Subtotal</span><span>$${subtotal.toLocaleString('es-CL')}</span></div>
        <div class="row"><span>IVA</span><span>$${iva.toLocaleString('es-CL')}</span></div>
        <div class="row"><span>Propina (${tipType * 100}%)</span><span>$${tip.toLocaleString('es-CL')}</span></div>

        <div class="line"></div>

        <div class="row"><b>Total</b><b>$${total.toLocaleString('es-CL')}</b></div>

        <script>window.print()</script>

        </body>
        </html>
        `

        win.document.write(html)
        win.document.close()

        setBoletaNum(prev => prev + 1)
    }

    return (
        <Dialog open={open} onClose={handleClose} className="relative z-50">

            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="fixed inset-0 flex justify-end">

                <DialogPanel className="w-[380px] h-full flex flex-col p-5 bg-[#111] text-white">

                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <DialogTitle className="font-bold text-lg">Carrito</DialogTitle>
                        <button onClick={handleClose}>
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {!checkout ? (
                        <div className="flex-1 overflow-y-auto mt-4 space-y-3">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between bg-white/5 p-3 rounded-xl">

                                    <div>
                                        <p>{item.name}</p>
                                        <p className="text-xs text-gray-400">
                                            ${(parsePrice(item.price) * item.quantity).toLocaleString('es-CL')}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <span className="w-6 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        <button onClick={() => removeItem(item.id)}>🗑</button>
                                    </div>

                                </div>
                            ))}
                        </div>

                    ) : !paid ? (

                        <div className="flex-1 mt-4 space-y-3">

                            {!loading ? (
                                <>
                                    <input required placeholder="Nombre del titular"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 bg-white/10" />

                                    <div className="relative">
                                        <input required placeholder="Número tarjeta"
                                            value={cardNumber}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/\D/g, '').slice(0,16)
                                                val = val.replace(/(.{4})/g, '$1 ').trim()
                                                setCardNumber(val)
                                                setCardType(getCardType(val))
                                            }}
                                            className="w-full p-2 bg-white/10 pr-16"
                                        />
                                        <span className="absolute right-2 top-2 text-xs">
                                            {cardType.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">

                                        <input required placeholder="MM/YY"
                                            value={expiry}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/\D/g, '').slice(0,4)
                                                if (val.length >= 3) {
                                                    val = val.slice(0,2) + '/' + val.slice(2)
                                                }
                                                setExpiry(val)
                                            }}
                                            className="w-full p-2 bg-white/10" />

                                        <input required placeholder="CVV"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0,4))}
                                            className="w-full p-2 bg-white/10" />
                                    </div>

                                    {/* PROPINA */}
                                    <div className="flex justify-between mt-2">
                                        {[0, 0.1, 0.15].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => setTipType(val)}
                                                className={`px-3 py-1 rounded-full border 
                                                ${tipType === val ? 'bg-green-500' : 'bg-white/10'}`}
                                            >
                                                {val === 0 ? "0%" : `${val * 100}%`}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="text-sm text-gray-300 mt-2">
                                        Total: ${total.toLocaleString('es-CL')}
                                    </div>

                                    <button onClick={handlePayment} className="w-full bg-green-600 py-2">
                                        Pagar
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center mt-10">
                                    <iframe
                                        src="https://lottie.host/embed/de05b112-0dc0-4a1a-b54b-dd18805807f1/EDwf7SeJPa.lottie"
                                        className="w-32 h-32"
                                    ></iframe>
                                    <p>Procesando pago...</p>
                                </div>
                            )}

                        </div>

                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center gap-3">
                            <div className="text-5xl"></div>
                            <p className="text-green-400 text-xl font-bold">Pago realizado</p>
                            <p className="text-gray-400 text-sm text-center">
                                Tu compra fue procesada correctamente
                            </p>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            if (!checkout) setCheckout(true)
                            else if (paid) downloadBill()
                        }}
                        disabled={checkout && !paid}
                        className="w-full mt-4 py-2 bg-indigo-500"
                    >
                        {!checkout ? "Ir a pagar" : paid ? "Descargar boleta" : "Completar pago"}
                    </button>

                </DialogPanel>
            </div>
        </Dialog>
    )
}