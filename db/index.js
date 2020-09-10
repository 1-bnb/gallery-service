const mongoose = require('mongoose');

mongoose.connect('mongodb://student:student@54.153.101.30/gallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//create connection and export to use in other files
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb://localhost/gallery');
});


module.exports = db;
