const express = require('express');
const router = express.Router();
const { User } = require('./model');

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'successfully', id: user.id });
  } catch (error) {
    res.status(500).send('An error occurred while creating the user');
  }
});

module.exports = router;
