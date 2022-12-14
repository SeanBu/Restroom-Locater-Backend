require("dotenv").config();
require('./config/db.connection.js');

const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const morgan = require('morgan')

const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const adminController = require('./controllers/adminController')

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());
app.use(morgan("dev"));

app.use('/', mainController);
app.use('/auth', authController);
app.use('/admin', adminController);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));