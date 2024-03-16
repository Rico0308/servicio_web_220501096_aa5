import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

try {
    // Conexión a la base de datos
    console.log('Conexión exitosa a la base de datos');

    // Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
    console.log(`Base de datos '${process.env.DB_DATABASE}' creada o ya existente`);

    // Seleccionar la base de datos
    await connection.query(`USE ${process.env.DB_DATABASE}`);
    console.log(`Base de datos '${process.env.DB_DATABASE}' seleccionada`);

    // Crear la tabla 'users' si no existe
    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `);
    console.log('Tabla "users" creada o ya existente');

} catch (err) {
    console.error('Error al conectar con la base de datos:', err);
} finally {
    // Cierra la conexión cuando hayamos terminado
    connection.end();
}