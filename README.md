# Aplicación de Inicio de Sesión y Registro

Esta es una aplicación de inicio de sesión y registro desarrollada en Node.js utilizando Express y una base de datos MariaDB. La aplicación proporciona endpoints para iniciar sesión y registrar nuevos usuarios.

## Requisitos Previos

Antes de ejecutar esta aplicación en tu entorno local, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) - versión 21.6.2 o superior
- [XAMPP](https://www.apachefriends.org/index.html) - para configurar el servidor de base de datos MariaDB
- [MariaDB](https://mariadb.org/) - como sistema de gestión de base de datos

## Instalación de Dependencias

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias necesarias: npm install

## Configuración de Variables de Entorno

Reemplaza las variables de entorno en el archivo `.env` por las de tu usuario:

- PORT=3000
- DB_HOST=localhost
- DB_USER=tu_usuario_de_mariadb
- DB_PASSWORD=tu_contraseña_de_mariadb
- DB_DATABASE=service_web_aa5
- DB_PORT=3310
- URL_SERVER=http://localhost

## Configuración de la Base de Datos

1. Inicia XAMPP y asegúrate de que el servidor MariaDB esté activo.
2. Abre el panel de control de XAMPP y haz clic en el botón "Admin" junto a MariaDB para abrir phpMyAdmin.
3. Abre la terminal e inicializa la base de datos de la siguiente forma: node ./config/db_init.js

## Ejecución del servidor

Inicial el servidor en local: nodemon .\index.js

## Uso

Puedes probar los endpoints de la aplicación utilizando un cliente HTTP como Postman o curl.

- Inicio de Sesión: Envía una solicitud POST a http://localhost:3000/login con un cuerpo JSON que incluya las credenciales de usuario.
  {
  username: "",
  password: ""
  }
- Registro de Usuario: Envía una solicitud POST a http://localhost:3000/register con un cuerpo JSON que incluya las credenciales del nuevo usuario.
  {
  username: "",
  password: ""
  }
