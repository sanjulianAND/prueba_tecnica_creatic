// Importamos los paquetes necesarios
const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Configuración de la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Creamos el modelo Usuario
class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // Encriptación de la contraseña antes de guardarla en la base de datos
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    }
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false,
});

// Creamos el modelo Cita (appoiments)
class Appointment extends Model {}

Appointment.init({
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Appointment',
  timestamps: false,
});

// Relación entre Usuario y Cita
User.hasMany(Appointment, {
  foreignKey: 'userId',
});
Appointment.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Appointment, sequelize };
