import React from 'react'

const AboutUs = () => {
    return (
        <div><section id="sobre" className="bg-[#071E1A] text-white py-28 px-6">

            <div className="max-w-6xl mx-auto">

                {/* HERO */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">

                    <div>
                        <h2 className="text-5xl font-bold leading-tight mb-6">
                            Café hecho con <span className="text-[#6EE7B7]">pasión real</span>
                        </h2>

                        <p className="text-gray-300 text-lg mb-6">
                            No vendemos café común. Trabajamos selección, tostado y control de calidad.
                        </p>

                        <p className="text-gray-400">
                            Cada grano tiene origen, historia y propósito.
                        </p>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200"
                        className="rounded-2xl h-[420px] w-full object-cover"
                    />

                </div>

                {/* VALORES */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">

                    <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')" }} />
                        <div className="absolute inset-0 bg-black/70" />
                        <div className="relative p-6 h-56 flex flex-col justify-end">
                            <h3 className="text-[#6EE7B7] text-xl">Precisión</h3>
                            <p className="text-gray-300 text-sm">Consistencia en cada extracción.</p>
                        </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521017432531-fbd92d768814')" }} />
                        <div className="absolute inset-0 bg-black/70" />
                        <div className="relative p-6 h-56 flex flex-col justify-end">
                            <h3 className="text-[#6EE7B7] text-xl">Origen</h3>
                            <p className="text-gray-300 text-sm">Productores seleccionados.</p>
                        </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517701604599-bb29b565090c')" }} />
                        <div className="absolute inset-0 bg-black/70" />
                        <div className="relative p-6 h-56 flex flex-col justify-end">
                            <h3 className="text-[#6EE7B7] text-xl">Frescura</h3>
                            <p className="text-gray-300 text-sm">Tostado reciente.</p>
                        </div>
                    </div>

                </div>

            </div>

        </section></div>
    )
}

export default AboutUs