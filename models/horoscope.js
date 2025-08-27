const mongoose = require('mongoose');

const horoscopeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  content: String,
});

module.exports = mongoose.model('Horoscope', horoscopeSchema);