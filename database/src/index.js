const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

// middlewares
const app = express();
app.use(express.json());
app.use(cors());

// Basic SQL injection security
app.use((req, res, next) => {
  const regex = /^((?!('|"|\$|\\|—)).)*$/;
  if (regex.test(Object.values(req.body).join())) {
    next();
  } else {
    res.status(400).json({
      error: 'Bad Request.',
    });
  }
});

// Routes
app.use(routes);

// Error handling
app.use((req, res) => {
  res.status(404);
  res.json({
    error: 'Not Found',
  });
});

app.use((error, req, res) => {
  res.status(error || 500);
  res.json({
    error: {
      message: 'Algo acaba de ocurrir',
    },
  });
});

app.listen(3000);
// eslint-disable-next-line no-console
console.log('Server on port 3000');
