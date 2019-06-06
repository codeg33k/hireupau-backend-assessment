const express = require('express');

const app = express();

const Bookings = require('./data/bookings.json');


// Routes
app.get('/bookings', (req, res) => {
  res.json(Bookings);
});


// Initialise HTTP Server
const port = 3000; // TODO: Add switch to use appropriate port for different configs, dev || staging || prod
app.listen(port, () => console.log(`Server started on port ${port}`));
