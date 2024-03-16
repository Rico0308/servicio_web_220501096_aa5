import dotenv from 'dotenv';
// Cargar variables de entorno desde el archivo .env
dotenv.config();

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerSpec = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: 'API Servicio Web AA5',
            version: '1.0.0',
            description: 'API para el registro y autenticación de usuarios',
        },
        servers: [
            {
                url: `${process.env.URL_SERVER}:${process.env.PORT}`
            }
        ]
    },
    apis: [join(__dirname, '../index.js')]
};

export default swaggerSpec;