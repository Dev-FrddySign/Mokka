import React, { useEffect, useState } from 'react'
import { useCart } from '../../../context/CartContext'

const productsData = [
    { id: 1, name: "Colombia Premium", category: "grano", price: "$12.990", description: "Notas de chocolate y caramelo con acidez balanceada.", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348" },
    { id: 2, name: "Brasil Intenso", category: "grano", price: "$11.990", description: "Cuerpo fuerte con notas a cacao y nuez.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { id: 3, name: "Etiopía Floral", category: "grano", price: "$13.990", description: "Perfil floral con toques cítricos.", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096" },

    // 🔥 CAMBIO AQUÍ: MOLIDO → INSTANTANEO
    { id: 4, name: "Instantáneo Clásico", category: "instantaneo", price: "$10.990", description: "Equilibrio perfecto para preparación rápida.", image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31" },
    { id: 5, name: "Instantáneo Espresso", category: "instantaneo", price: "$11.490", description: "Sabor intenso en segundos.", image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13" },

    { id: 6, name: "Cold Brew Suave", category: "bebidas", price: "$9.990", description: "Café frío suave y refrescante.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c" },
    { id: 7, name: "Cápsulas Forte", category: "capsulas", price: "$8.990", description: "Café intenso compatible con máquinas estándar.", image: "https://images.unsplash.com/photo-1649897657204-23f4dd5e125d" },
    { id: 8, name: "Cápsulas Latte", category: "capsulas", price: "$9.490", description: "Perfecto para lattes cremosos.", image: "https://images.unsplash.com/photo-1587080413959-06b859fb107d" },
    { id: 9, name: "Cápsulas Descafeinado", category: "capsulas", price: "$9.990", description: "Todo el sabor sin cafeína.", image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e" },
    { id: 10, name: "Blend Especial", category: "grano", price: "$14.990", description: "Mezcla exclusiva con final prolongado.", image: "https://images.unsplash.com/photo-1515442261605-65987783cb6a" },
    { id: 11, name: "Macchiato", category: "bebidas", price: "$4.990", description: "Espresso con leche espumada.", image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13" },
    { id: 12, name: "Mokka Helado", category: "bebidas", price: "$5.990", description: "Café frío con chocolate.", image: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff" }
]

const Contenido = () => {
    const { addToCart } = useCart()
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        const saved = localStorage.getItem("coffeeFilter")
        if (saved) setFilter(saved)
    }, [])

    useEffect(() => {
        if (filter) localStorage.setItem("coffeeFilter", filter)
        else localStorage.removeItem("coffeeFilter")
    }, [filter])

    const filteredProducts = filter
        ? productsData.filter(p => p.category === filter)
        : productsData

    // 🔥 CAMBIO AQUÍ: filtros actualizados
    const categories = ["grano", "instantaneo", "capsulas", "bebidas"]

    return (
        <section id="cafe" className="bg-gradient-to-b from-[#071E1A] via-[#0B2E26] to-[#071E1A] text-white py-24 px-6 mt-20">

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold">Explora nuestro café</h2>
                <p className="text-gray-400 mt-2">Selecciona tu tipo favorito</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">

                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2 rounded-full text-sm border transition
                        ${filter === cat
                                ? "bg-[#1F7A5C] border-[#6EE7B7] text-white"
                                : "border-white/20 hover:bg-[#123F35]"
                            }`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}

                {filter && (
                    <button
                        onClick={() => setFilter(null)}
                        className="px-4 py-2 text-sm rounded-full bg-red-500 hover:bg-red-600 transition"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="rounded-xl overflow-hidden border border-white/10 bg-black/20"
                    >

                        <div className="h-56 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-5">

                            <span className="text-xs bg-[#6EE7B7] text-black px-2 py-1 rounded">
                                {product.category}
                            </span>

                            <h3 className="text-lg font-semibold mt-2">
                                {product.name}
                            </h3>

                            <p className="text-sm text-gray-300 mt-1">
                                {product.description}
                            </p>

                            <div className="flex justify-between items-center mt-4">

                                <span className="text-[#6EE7B7] font-bold">
                                    {product.price}
                                </span>

                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-[#1F7A5C] px-4 py-2 rounded-lg text-sm hover:bg-[#166A4A] transition cursor-pointer"
                                >
                                    Comprar
                                </button>

                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default Contenido