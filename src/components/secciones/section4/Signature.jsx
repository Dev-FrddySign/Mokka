import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import cafe from '../../../assets/logo/cafe.png'

// 🔥 Inicialización correcta (IMPORTANTE)
emailjs.init('xgMOMZuu9CkvW9lOF')

const Signature = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)
        setError(false)

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                message: formData.message || "Nuevo suscriptor a Mokka Coffee",
                logo: logo
            }

            const response = await emailjs.send(
                'service_9ohnj1f',
                'template_w21418o',
                templateParams
            )

            console.log("EMAIL ENVIADO:", response)

            setSuccess(true)
            setFormData({
                name: '',
                email: '',
                message: ''
            })

        } catch (err) {
            console.error("ERROR EMAILJS:", err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="suscripcion" className="bg-[#0B2E26] text-white py-24 px-6">

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* INFO */}
                <div>
                    <h2 className="text-4xl font-bold mb-4">
                        Suscríbete a <span className="text-[#6EE7B7]">Mokka Coffee</span>
                    </h2>

                    <p className="text-gray-300 mb-6">
                        Recibe ofertas exclusivas, nuevos cafés y contenido premium directamente en tu correo.
                    </p>

                    <img
                        src={cafe}
                        alt="logo moka"
                        className="w-28 opacity-80"
                    />
                </div>

                {/* FORMULARIO */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-lg"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:border-[#6EE7B7]"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:border-[#6EE7B7]"
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Mensaje (opcional)"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10 h-28 focus:outline-none focus:border-[#6EE7B7]"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1F7A5C] py-3 rounded-lg hover:bg-[#166A4A] transition font-semibold"
                    >
                        {loading ? 'Enviando...' : 'Suscribirme'}
                    </button>

                    {success && (
                        <p className="text-green-400 mt-4 text-sm text-center">
                            ✔ Suscripción enviada correctamente
                        </p>
                    )}

                    {error && (
                        <p className="text-red-400 mt-4 text-sm text-center">
                            ❌ Error al enviar. Revisa EmailJS (service/template/key)
                        </p>
                    )}

                </form>

            </div>

        </section>
    )
}

export default Signature