const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// USUARIOS FALSOS
const users = [
    { id: 1, username: 'admin', password: '1234' },
    { id: 2, username: 'user', password: 'abcd' }
]

// LOGIN
app.post('/login', (req, res) => {

    try {
        const { username, password } = req.body || {}

        // ERROR 400 → DATOS FALTANTES
        if (!username || !password) {
            return res.status(400).json({
                message: "Faltan credenciales"
            })
        }

        const user = users.find(
            u => u.username === username && u.password === password
        )

        // ERROR 401 → CREDENCIALES INCORRECTAS
        if (!user) {
            return res.status(401).json({
                message: "Credenciales incorrectas. No autorizado."
            })
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            'secreto',
            { expiresIn: '1h' }
        )

        // COOKIE SEGURA (httpOnly)
        res.cookie('token', token, {
            httpOnly: true,          
            secure: false,          
            sameSite: 'strict'      
        })

        res.status(200).json({
            message: 'Login exitoso'
        })

    } catch (error) {
        // ERROR 500 → ERROR INTERNO
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
})


// MIDDLEWARE
const verifyToken = (req, res, next) => {

    try {
        const token = req.cookies.token

        // ERROR 401 → SIN TOKEN
        if (!token) {
            return res.status(401).json({
                message: 'No autorizado'
            })
        }

        const decoded = jwt.verify(token, 'secreto')
        req.user = decoded

        next()

    } catch (err) {
        // ERROR 401 → TOKEN INVÁLIDO O EXPIRADO
        return res.status(401).json({
            message: 'Token inválido o expirado'
        })
    }
}


// RUTA PRIVADA
app.get('/private', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'Acceso permitido',
        user: req.user
    })
})


// LOGOUT
app.post('/logout', (req, res) => {

    // ELIMINAR COOKIE SEGURA
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    })

    res.status(200).json({
        message: 'Sesión cerrada'
    })
})


/* ============================
CARRITO (CON ERRORES HTTP)
============================ */

let cart = []

// GET CART
app.get('/cart', (req, res) => {
    res.status(200).json(cart)
})

// ADD ITEM
app.post('/cart', (req, res) => {

    try {
        const item = req.body

        // ERROR 400 → ITEM INVÁLIDO
        if (!item || !item.id || !item.name || !item.price) {
            return res.status(400).json({
                message: 'Producto inválido'
            })
        }

        const existing = cart.find(p => p.id === item.id)

        if (existing) {
            existing.quantity += 1
        } else {
            cart.push({
                ...item,
                quantity: 1
            })
        }

        res.status(200).json(cart)

    } catch (error) {
        res.status(500).json({
            message: 'Error al agregar producto'
        })
    }
})

// UPDATE QUANTITY
app.patch('/cart/:id', (req, res) => {

    try {
        const id = Number(req.params.id)
        const { quantity } = req.body

        if (!quantity) {
            return res.status(400).json({
                message: 'Cantidad inválida'
            })
        }

        cart = cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
        )

        res.status(200).json(cart)

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar cantidad'
        })
    }
})

// DELETE ITEM
app.delete('/cart/:id', (req, res) => {

    try {
        const id = Number(req.params.id)

        cart = cart.filter(item => item.id !== id)

        res.status(200).json(cart)

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar producto'
        })
    }
})

// CLEAR CART
app.delete('/cart', (req, res) => {
    cart = []
    res.status(200).json(cart)
})


app.listen(3001, () =>
    console.log('Server running on http://localhost:3001')
)