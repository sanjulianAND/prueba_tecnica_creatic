require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes');
const { sequelize } = require('./model');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.get('/', (req, res) => {
  res.send('Wllcome to my API');
});
sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  });
