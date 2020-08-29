let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let propertySchema = new Schema({
  _id: Number,
  description: String,
  starRating: Number,
  reviewTotal: Number,
  superhost: Boolean,
  location: String,
  images: [{
    id: Number,
    imageURL: String,
    description: String
  }]
});

var Property = mongoose.model('property', propertySchema);

module.exports.Property = Property;
