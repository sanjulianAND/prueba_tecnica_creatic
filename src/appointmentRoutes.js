const express = require('express');
const router = express.Router();
const { User, Appointment } = require('./model');
const { Op } = require('sequelize');

// obtenemos todas las citas disponibles
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        userId: null // Aquí buscamos todas las citas que no tienen un usuario asociado, es decir, que están disponibles
      }
    });

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Se produjo un error al obtener las citas' });
  }
});

// Reservarmos una cita
router.post('/:id/book', async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    // Verificamos que el usuario exista
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: 'El usuario no existe' });
    }

    // Buscamos una cita disponible en la fecha especificada
    const appointment = await Appointment.findOne({
      where: {
        date,
        userId: null, 
      },
    });

    // Si la cita no está disponible, enviamos un error
    if (!appointment) {
      return res.status(400).json({ message: 'La cita no está disponible' });
    }

    // Asociamos el usuario con la cita y guardamos los cambios
    appointment.userId = id;
    await appointment.save();

    res.json({ message: 'Cita reservada exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Se produjo un error al reservar la cita' });
  }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
  try {
    const { id, date } = req.body;

    // Verificamos que el usuario exista
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: 'El usuario no existe' });
    }

    // Verificamos que el usuario no tenga ya una cita a la misma hora
    const existingAppointment = await Appointment.findOne({
      where: {
        date,
        userId: id,
      },
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'El usuario ya tiene una cita en este horario' });
    }

    // Creamos la nueva cita y la asociamos con el usuario
    const newAppointment = await Appointment.create({ date, userId: id });

    res.json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Se produjo un error al crear la cita' });
  }
});

module.exports = router;
