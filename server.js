require("dotenv").config();

const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('Backend Working')
})

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));