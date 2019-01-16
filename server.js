const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// configure middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const PORT = process.env.PORT || 5001;

app.use('/api/v1', routes);
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Welcome to the begining of nothingness' });
  });

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})