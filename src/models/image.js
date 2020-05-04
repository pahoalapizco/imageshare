const mongoose = require('mongoose');
const path = require('path');

const { Schema } = mongoose;

const ImagaSchema = new Schema({
  title: String,
  description: String,
  filename: String,
  views:{
    type: Number,
    default: 0
  },
  likes:{
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Esta función se crea de forma virtual y regresara solo el nombre del img sin su extensión.
ImagaSchema.virtual('uniqueId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '');
  });

module.exports = mongoose.model('image', ImagaSchema);
