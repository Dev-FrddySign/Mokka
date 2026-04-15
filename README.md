# Mokka
Ecommerce  trabajo AIEP

Proyecto backend desarrollado con **Node.js y Express.js** que implementa un sistema de autenticación basado en **JSON Web Tokens (JWT)**, manejo de sesiones mediante **cookies seguras**, protección de rutas privadas y un módulo de carrito de compras.

Tailwind CSS
Axios

Backend

Node.js
Express.js
JWT (jsonwebtoken)
Cookie Parser
CORS
⚡ Funcionalidades
🔑 Login con JWT
🍪 Autenticación con cookies httpOnly
🔒 Rutas protegidas (/private)
🚪 Logout
🛒 Carrito de compras (CRUD)
💳 Simulación de pago
🧾 Generación de boleta
💸 Cálculo de IVA + propina (0%, 10%, 15%)
🔄 Flujo del sistema
Usuario inicia sesión
Se genera JWT en cookie segura
Accede a rutas protegidas
Agrega productos al carrito
Realiza pago simulado
Se genera boleta
Carrito se limpia automáticamente

🔐 Endpoints
Auth

POST → /login
GET → /private
POST → /logout

Carrito

GET → /cart
POST → /cart
PATCH → /cart/:id
DELETE → /cart/:id
DELETE → /cart

🧪 Pruebas
Login

POST → http://localhost:3001/login

<img width="921" height="169" alt="image" src="https://github.com/user-attachments/assets/c9e804d2-2b5e-469c-9f0d-5a3942ac8c15" />

Ruta protegida

GET → http://localhost:3001/private

<img width="921" height="198" alt="image" src="https://github.com/user-attachments/assets/05a2c9a1-33f9-40a3-8501-8eea278ddc87" />

Logout

POST → http://localhost:3001/logout

<img width="921" height="125" alt="image" src="https://github.com/user-attachments/assets/0df4228f-9de7-4470-afa8-0dc2d8712eb7" />

⚠️ Manejo de errores
400 → datos incompletos
401 → credenciales inválidas o sin token
🔐 Seguridad
Cookies httpOnly (protección XSS)
Tokens con expiración
Middleware de validación JWT

🧠 Arquitectura
Frontend (React)
   ↓
Backend (Express)
   ↓
JWT + Cookies
   ↓
Lógica carrito (memoria)

🚀 Mejoras futuras
Base de datos (MongoDB / PostgreSQL)
bcrypt para contraseñas
variables de entorno (.env)
refresh tokens
sistema de roles
👨‍💻 Autor

Grupos 2 
Estructura: Freddy Saldivia
Diseño: Johannes Rojas
UI: Samuel Sariego
💻 Fullstack Developer

=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 0bf86d1 (Se agrega el proyecto)
