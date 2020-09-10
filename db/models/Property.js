let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let propertySchema = new Schema({
  id: Number,
  description: String,
  starRating: Number,
  reviewTotal: Number,
  superHost: Boolean,
  location: String,
  images: Array
});

var Property = mongoose.model('property', propertySchema);

module.exports = Property;
