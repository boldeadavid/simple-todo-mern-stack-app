const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // adaugă și asta pentru a elimina spațiile goale
  },
  status: {
    type: Boolean,
    required: true,
    default: false, // opțional, în caz că vrei ca statusul să fie false inițial
  },
});

module.exports = mongoose.model('Todo', todoSchema);
