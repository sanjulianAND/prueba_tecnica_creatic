// Cargamos las variables de entorno
require('dotenv').config();

// Importamos los paquetes necesarios
const express = require('express');
const userRoutes = require('./routes');
const appointmentRoutes = require('./appointmentRoutes');

// Importamos el objeto sequelize desde el modelo
const { sequelize } = require('./model');

const app = express();

// Middleware para parsear el cuerpo de las solicitudes HTTP
app.use(express.json());

// Rutas para los usuarios y las citas
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);

// Con esto hace la cnexión a la base de datos e inicia el servidor
sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  });
