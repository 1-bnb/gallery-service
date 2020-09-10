const fs = require('fs');
// const writeImages = fs.createWriteStream('/Users/EugeneKim/Documents/Hackreactor/SDC/gallery/database/images10.csv');
// const writeProperties = fs.createWriteStream('/Users/EugeneKim/Documents/Hackreactor/SDC/gallery/database/propertiesTest.csv');
const writeMongoObjects = fs.createWriteStream('/Users/EugeneKim/Documents/Hackreactor/SDC/gallery/database/mongoObjects.csv');
// const {performance} = require('perf_hooks');

var imageurls = ['https://moreplaces.s3-us-west-1.amazonaws.com/img1.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img2.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img3.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img4.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img5.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img6.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img7.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img8.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img9.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img10.jpg', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/deathstranding_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/outerworlds_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/fallenorder_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/destroyhumans_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/tsushima_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/snowrunner_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/bugsbunny_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/phantommenace_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/goosebumps_thumbnail.webp', 'https://video-carousel-thumbnails.s3-us-west-1.amazonaws.com/lbpkarting_thumbnail.webp'];
var imageDescriptions = ['exterior', 'exterior', 'exterior', 'living room', 'living room', 'dining room', 'dining room', 'dining room', 'kitchen', 'kitchen', 'bathroom', 'bedroom 1', 'bedroom 1', 'bedroom 1', 'hallway', 'bedroom 2', 'bedroom 2', 'bathroom', 'patio', 'backyard'];
var cities = ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine'];
var adjectives = ['Big', 'Beautiful', 'Comfortable', 'Cozy', 'Huge', 'Small', 'Quaint'];
var homeTypes = ['home', 'apartment', 'condo']

//image object generator helpers
var generateImageURL = (count) => {
  return imageurls[(count - 1) % imageurls.length];
}

var generateImageDescription = (count) => {
  return imageDescriptions[count % imageDescriptions.length];
}

//property object generator helpers
var generateCity = (count) => {
  return cities[count % cities.length];
}

var generateDescription = (count, city) => {
  return `${adjectives[count % adjectives.length]} ${city} ${homeTypes[count % homeTypes.length]}`;
}

var generateStarRating = (count) => {
  var ratings = [3.5, 3.8, 4.1, 4.3, 4.5, 4.6, 4.8, 4.9];

  return ratings[count % ratings.length];
}

var generateReviewTotal = (count) => {
  var reviewCounts = [12, 23, 49, 77, 102, 131, 154, 177, 192, 214, 231];

  return reviewCounts[count % reviewCounts.length];
}

var generateImageIndexes = (count) => {
  var imageArr = [];
  var startIndex = 20 * count - 19;
  var endIndex = 20 * count;
  for (var i = startIndex; i <= endIndex; i++) {
    imageArr.push(i);
  }
  return imageArr;
}

var generateImageArray = (count) => {
  var imageArr = [];
  var startIndex = 20 * count - 19;
  var endIndex = 20 * count;
  for (var i = startIndex; i <= endIndex; i++) {
    var image = {
      id: i,
      imageURL: generateImageURL(i),
      description: generateImageDescription(i)
    }
    imageArr.push(image);
  }
  return imageArr;
}

//image object generator
var generateImage = (i) => {
  var image = {
    id: i,
    imageURL: generateImageURL(i),
    description: generateImageDescription(i)
  }
  var dataString = `${image.id}, ${image.imageURL}, ${image.description}\n`
  return dataString;
}

//property object generators
var generateProperty = (i) => {
  var city = generateCity(i);
  var property = {
    id: i,
    description: generateDescription(i, city),
    starRating: generateStarRating(i),
    reviewTotal: generateReviewTotal(i),
    superHost: i % 10 === 0 ? true : false,
    location: `${city}, CA, United States`
  }
  return property;
}

var generatePostgresProperty = (i) => {
  property = generateProperty(i)
  property.images = generateImageIndexes(property.id);
  var dataString = `${property.id}, ${property.description}, ${property.starRating}, ${property.reviewTotal}, ${property.superHost}, "${property.location}", "{${property.images}}"\n`;
  return dataString;
}

var generateMongoProperty = (i) => {
  property = generateProperty(i);
  property.images = generateImageArray(property.id);
  // var dataString = `${property.id}, ${property.description}, ${property.starRating}, ${property.reviewTotal}, ${property.superHost}, "${property.location}", ${property.images}`;
  // return dataString;
  return JSON.stringify(property);
}

//CSV writer
const writeNObjects = (generator, count, writer, encoding, callback) => {
  let i = count;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      var dataString = generator(id) + '\n';
      if (i === 0) {
        writer.write(dataString, encoding, callback);
      } else {
        ok = writer.write(dataString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

writeNObjects(generateMongoProperty, 10000000, writeMongoObjects, 'utf-8', () => {
  writeMongoObjects.end();
});
//write chain
// var t0 = performance.now();
// writeNObjects(generateImage, 200000000, writeImages, 'utf-8', () => {
//   writeImages.end();
//   var t1 = performance.now()
//   console.log(`postgres images done, time: ${(t1 - t0) / 1000} seconds`);
//   writeNObjects(generatePostgresProperty, 10000000, writeProperties, 'utf-8', () => {
//     writeProperties.end();
//     var t2 = performance.now()
//     console.log(`postgres properties done, time: ${(t2 - t1) / 1000} seconds`);
    // writeNObjects(generateMongoProperty, 10, writeMongoObjects, 'utf-8', () => {
    //   writeMongoObjects.end();
    //   var t3 = performance.now()
    //   console.log(`mongo objects done, time: ${(t3 - t2) / 1000} seconds`);
    // });
//   });
// })