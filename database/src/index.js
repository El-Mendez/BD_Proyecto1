const express = require('express');
const routes = require('./routes/index')
const cors = require('cors')

// middlewares
const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors())

// Rutas
app.use(routes)

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status(404);
    res.json({
        error: "Not Found"
    })
})

app.use((error, req, res) => {
    res.status(error || 500);
    res.json({
        error: {
            message: "Algo acaba de ocurrir"
        }
    })
})


app.listen(3000);
console.log('Server on port 3000');