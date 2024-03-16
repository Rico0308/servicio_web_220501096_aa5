import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import swaggerConfig from './swagger/swagger.js';


import { query } from './config/db.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar datos JSON
app.use(express.json());
app.disable('x-powered-by');
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerConfig)));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     description: Verifica las credenciales del usuario y devuelve un mensaje de autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Autenticación satisfactoria
 *       '401':
 *         description: Error en la autenticación
 */
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Consultar el usuario en la base de datos
        const [rows] = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Autenticación exitosa
        res.status(200).json({ message: 'Autenticación satisfactoria' });
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registro de nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente
 *       '400':
 *         description: Error en la solicitud del cliente
 *       '500':
 *         description: Error en el servidor
 */
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const [existingUser] = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Hash de la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        await query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        // Respuesta exitosa
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});