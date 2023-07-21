const express = require('express');
const router = express.Router();
const { User } = require('./model');

// Creación de un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'Usuario creado exitosamente', id: user.id });
  } catch (error) {
    res.status(500).send('Se produjo un error al crear el usuario');
  }
});

// Implementamos el get de la información de un usuario
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Se produjo un error al buscar el usuario' });
  }
});

// Actualización de la información de un usuario
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Se produjo un error al actualizar el usuario' });
  }
});
module.exports = router;
