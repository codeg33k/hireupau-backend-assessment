const express = require('express');
const moment = require('moment');
const bookings = require('./data/bookings');

const app = express();

function getDuration(from, to) {
  const startTime = moment(from);
  const endTime = moment(to);

  return moment.duration(endTime.diff(startTime)).asHours();
}

function getRate(time) {
  const day = moment(time).isoWeekday();
  const weekdayRate = 38;
  const weeknightRate = 42.93;
  const nightRateHoursFrom = 20;
  const nightRateHoursTo = 6;
  const saturdayRate = 45.91;
  const sundayRate = 60.85;

  // On a weekday, if it is a daytime or nightime booking and set the rate accoring to finish time. Otherwise, set weekend rate.
  switch (day) {
    case 6:
      return saturdayRate;
    case 7:
      return sundayRate;
    default:
      return moment(time).hours() >= nightRateHoursFrom || moment(time).hours() <= nightRateHoursTo ? weeknightRate : weekdayRate;
  }
}

// Routes
app.get('/bookings', (req, res) => {
  try {
    res.json(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/bookings/:id', (req, res) => {
  try {
    res.json(bookings.find(booking => String(booking.id) === id));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/invoices', (req, res) => {
  bookings.forEach((booking) => {
    const duration = getDuration(booking.from, booking.to);
    const minHours = 1;
    const maxHours = 24;

    // Determine whether the booking falls within a valid range
    const isValidDuration = duration >= minHours && duration <= maxHours;

    // Determine whether the booking from occurs before the booking to
    const isValidFromAndTo = moment(booking.from).isBefore(booking.to);

    // Determine whether the timezones are the same
    const isValidTimezone = moment.parseZone(booking.from).utcOffset() === moment.parseZone(booking.to).utcOffset();

    booking.isValid = isValidDuration && isValidFromAndTo && isValidTimezone;

    booking.total = booking.isValid ? parseFloat((getRate(booking.to) * duration).toFixed(2)) : 0;
  });

  try {
    res.json(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Initialise HTTP Server
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
