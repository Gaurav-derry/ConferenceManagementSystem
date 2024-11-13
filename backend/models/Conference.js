const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
});

module.exports = mongoose.model('Conference', conferenceSchema);
