import React, { useEffect, useRef, useState } from 'react'

const testimonialsData = [
    {
        text: "Desde que probé Mokka, no volví a comprar café de supermercado. El aroma y sabor son otro nivel.",
        name: "Carlos Rojas",
        role: "Cliente frecuente",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        text: "La suscripción mensual es lo mejor. Siempre tengo café fresco en casa.",
        name: "Valentina Muñoz",
        role: "Suscriptora Mokka",
        img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        text: "El envío fue rápido y el café llegó recién tostado. Se nota la calidad.",
        name: "Javier Soto",
        role: "Comprador nuevo",
        img: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
        text: "Probé el café de Etiopía y quedé impresionada. Muy recomendado.",
        name: "Camila Pérez",
        role: "Amante del café",
        img: "https://randomuser.me/api/portraits/women/68.jpg"
    }
]

const stats = [
    { value: 2700, label: "Clientes felices", suffix: "+" },
    { value: 1800, label: "Suscripciones", suffix: "+" },
    { value: 35, label: "Variedades de café" },
    { value: 10, label: "Productos" }
]

/* 🔢 COUNTER */
const Counter = ({ end, startAnimation, suffix }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!startAnimation) return

        let start = 0
        const duration = 2000
        const increment = end / (duration / 16)

        const counter = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(counter)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(counter)
    }, [startAnimation, end])

    return (
        <h2 className="text-4xl font-bold text-white">
            {count.toLocaleString()}{suffix || ""}
        </h2>
    )
}

const Testimonials = () => {
    const [index, setIndex] = useState(0)
    const statsRef = useRef()
    const [visible, setVisible] = useState(false)

    // 🔁 Rotación
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonialsData.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    // 👀 Scroll stats
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true)
                observer.disconnect()
            }
        }, { threshold: 0.5 })

        if (statsRef.current) observer.observe(statsRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <section className="text-gray-300 bg-[#0B2E26] py-24">
            <div className="container px-5 mx-auto text-center">

                <h1 className="text-3xl font-bold text-white mb-12">
                    Lo que dicen nuestros clientes
                </h1>

                {/*CONTENEDOR FIJO */}
                <div className="relative max-w-2xl mx-auto mb-16 h-[260px]">

                    {testimonialsData.map((t, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-all duration-700 ${
                                i === index
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}
                        >
                            <div className="h-full flex flex-col justify-between bg-[#123F35]/70 backdrop-blur-md p-8 rounded-xl border border-white/10">

                                {/* ⭐ estrellas (mejora visual) */}
                                <div className="text-[#6EE7B7] mb-2 text-lg">
                                    ★★★★★
                                </div>

                                <p className="leading-relaxed text-lg">
                                    “{t.text}”
                                </p>

                                <div className="flex items-center mt-6">
                                    <img
                                        src={t.img}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="ml-4 text-left">
                                        <p className="text-white font-semibold">{t.name}</p>
                                        <p className="text-gray-400 text-sm">{t.role}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* INDICADORES */}
                <div className="flex justify-center mb-16 gap-2">
                    {testimonialsData.map((_, i) => (
                        <span
                            key={i}
                            className={`w-3 h-3 rounded-full transition ${
                                i === index ? "bg-[#6EE7B7]" : "bg-gray-500"
                            }`}
                        />
                    ))}
                </div>

                {/* 📊 STATS */}
                <div ref={statsRef} className="flex flex-wrap -m-4 text-center">
                    {stats.map((item, i) => (
                        <div key={i} className="p-4 sm:w-1/4 w-1/2">
                            <Counter
                                end={item.value}
                                startAnimation={visible}
                                suffix={item.suffix}
                            />
                            <p className="text-gray-300 mt-2">{item.label}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Testimonials