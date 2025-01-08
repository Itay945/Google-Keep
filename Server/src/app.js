const express = require('express');
const connectDB = require('./config/db');
const keepsRoutes = require('./routers/keepsRoutes');

require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/keeps', keepsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my api' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server run on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
