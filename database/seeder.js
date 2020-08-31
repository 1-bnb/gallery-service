const fs = require('fs');
var imageurls = ['link1', 'link2', 'link3', 'link4', 'link5', 'link6', 'link7', 'link8', 'link9', 'link10', 'link11', 'link12', 'link13', 'link14', 'link15', 'link16', 'link17', 'link18', 'link19', 'link20'];
var imageDescriptions = ['exterior', 'exterior', 'exterior', 'living room', 'living room', 'dining room', 'dining room', 'dining room', 'kitchen', 'kitchen', 'bathroom', 'bedroom 1', 'bedroom 1', 'bedroom 1', 'hallway', 'bedroom 2', 'bedroom 2', 'bathroom', 'patio', 'backyard'];


var imageObjects = [];

//image object generator
var generateImage = (count) => {
  for (var i = 1; i <= count; i++) {
    var image = {
      id: i,
      imageURL: generateImageURL(i),
      description: generateImageDescription(i)
    }
    imageObjects.push(image);
    var dataString = `${image.id}, ${image.imageURL}, ${image.description}\n`
    fs.appendFileSync('images.csv', dataString);
  }
}

//image object generator helpers
var generateImageURL = (count) => {
  return imageurls[(count - 1) % imageurls.length];
}

var generateImageDescription = (count) => {
return imageDescriptions[count % imageDescriptions.length];
}

//property object generator
var generateProperty = (count) => {
  for (i = 1; i <= count; i++) {
    var city = generateCity(i);
    var property = {
      id: i,
      description: generateDescription(i, city),
      starRating: generateStarRating(i),
      reviewTotal: generateReviewTotal(i),
      superHost: i % 10 === 0 ? true : false,
      location: `${city}, CA, United States`
    };
    writePostgresProperty(property);
    writeMongoProperty(property);
  }
}

var writePostgresProperty = (property) => {
  property.images = generateImageIndexes(property.id);
  var dataString = `${property.id}, ${property.description}, ${property.starRating}, ${property.reviewTotal}, ${property.superHost}, "${property.location}" [${property.images}]\n`;

  fs.appendFileSync('properties.csv', dataString);
}

var writeMongoProperty = (property) => {
  property.images = JSON.stringify(generateImageArray(property.id));
  var dataString = `${property.id}, ${property.description}, ${property.starRating}, ${property.reviewTotal}, ${property.superHost}, "${property.location}" ${property.images}\n`;
  // console.log(property.images);
  fs.appendFileSync('mongo.csv', dataString);
}

//property object generator helpers
var generateCity = (count) => {
  var cities = ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine'];

  return cities[count % cities.length];
}

var generateDescription = (count, city) => {
  var adjectives = ['Big', 'Beautiful', 'Comfortable', 'Cozy', 'Huge', 'Small', 'Quaint'];

  var homeTypes = ['home', 'apartment', 'condo']

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
  var startIndex = 20 * (count - 1);
  var endIndex = (20 * count) - 1
  for (var i = startIndex; i <= endIndex; i++) {
    imageArr.push(imageObjects[i]);
  }
  return imageArr;
}


generateImage(2000);
generateProperty(100);