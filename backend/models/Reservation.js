const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conference: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference', required: true },
  reservedAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('Reservation', reservationSchema);
