import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [open, setOpen] = useState(false)

    const fetchCart = async () => {
        const res = await axios.get('http://localhost:3001/cart')
        setCart(res.data)
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const addToCart = async (product) => {
        const res = await axios.post('http://localhost:3001/cart', product)
        setCart(res.data)
    }

    const removeItem = async (id) => {
        const res = await axios.delete(`http://localhost:3001/cart/${id}`)
        setCart(res.data)
    }

    const updateQuantity = async (id, quantity) => {
        if (quantity < 1) return

        const res = await axios.patch(`http://localhost:3001/cart/${id}`, {
            quantity
        })

        setCart(res.data)
    }

    // 🔥 FIX CLAVE
    const clearCart = async () => {
        await axios.delete('http://localhost:3001/cart')
        setCart([])
    }

    return (
        <CartContext.Provider value={{
            cart,
            open,
            setOpen,
            addToCart,
            removeItem,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}