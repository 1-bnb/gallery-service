let Property = require('../../db/models/Property');

// let db = require('../../db/index.js');

const getProperties = (_id, callback) => {
  Property.find({ id: _id }, (err, document) => {
    if (err) {
      console.log('err', err);
    } else {
      callback(null, document);
    }
  });
};

const addPhoto = (_id, photoObj, callback) => {
  Property.updateOne({ id: _id }, { $push: { images: photoObj } }, (err, document) => {
    if (err) {
      console.log('err', err);
    } else {
      callback(null, document);
    }
  });
}

module.exports.getProperties = getProperties;
module.exports.addPhoto = addPhoto;