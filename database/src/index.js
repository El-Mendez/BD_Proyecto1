const express = require('express');
const app = express();
const routes = require('./routes/index')

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Rutas
app.use(routes)


app.listen(3000);
console.log('Server on port 3000');