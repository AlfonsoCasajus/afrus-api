
# Afrus Test API

Se desarrollo una API utilizando Nest.js y Typescript que permite la gestion de Productos y compradores. Cuenta con una base de datos PostgreSQL que fue llenada de datos de prueba utilizando Faker.js

**Documentacion API:** https://afrus-api.onrender.com/api

**Live Demo:** https://afrus-front.vercel.app

**Codigo Front End:** https://github.com/AlfonsoCasajus/afrus-front

## Tecnologias Utilizadas

**Server:** Nest.js, Typescript, Faker.js (Seed de la BBDD)

**ORM:** Prisma

**Base de datos:** PostgreSQL

**Documentación:** Swagger


## Correr Localmente
Clonar Proyecto

```bash
  git clone https://github.com/AlfonsoCasajus/afrus-api.git
```

Entra al Directorio del Proyecto

```bash
  cd afrus-api
```

Instala las dependencias

```bash
  npm install
```

Configura la base de datos con Prisma

```bash
  npx prisma migrate deploy
```

 Inicia el Servidor

```bash
  npm run start
```


## Varbiales de Entorno

En el archivo .env.example se econtraran las siguientes variables de entorno que deben ser agregadas y completadas en el archivo .env

`DB_HOST=`: Dirección del servidor de base de datos.

`DB_PORT=`: Puerto en el que está corriendo la base de datos.

`DB_NAME=`: Nombre de la base de datos.

`DB_USER=`: Usuario de la base de datos.

`DB_PASSWORD=`: Contraseña del usuario de la base de datos.

**No es necesario modificar las siguientes variables de entorno:**

`DATABASE_URL=` La URL de conexión para la base de datos

`FRONTEND_URL=`Dirección del frontend de la aplicación.

