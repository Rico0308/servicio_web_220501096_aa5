import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

// Función para realizar una consulta a la base de datos
export const query = async (sql, values = []) => {
    try {
        const rows = await connection.execute(sql, values);
        return rows;
    } catch (err) {
        console.error('Error al ejecutar consulta:', err);
        throw err;
    }
};

// Función para cerrar la conexión a la base de datos
export const closeConnection = () => {
    connection.end();
};