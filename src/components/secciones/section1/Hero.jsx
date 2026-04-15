import React from 'react'

const Hero = () => {

    const scrollToCafe = () => {
        const section = document.getElementById('cafe')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id="inicio" className="relative w-full h-screen overflow-hidden -mb-1">

            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/src/assets/video/hero/Molido.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">

                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Despierta tus sentidos con <span className="text-[#6EE7B7]">MOKKA</span>
                </h1>

                <p className="max-w-xl mb-8 text-lg text-gray-200">
                    Granos seleccionados y tostado perfecto.
                </p>

                <div className="flex gap-4 flex-wrap justify-center">

                    <button
                        onClick={scrollToCafe}
                        className="bg-[#1F7A5C] px-6 py-3 rounded-lg hover:bg-[#166A4A] transition"
                    >
                        Comprar café
                    </button>

                </div>

            </div>
        </section>
    )
}

export default Hero