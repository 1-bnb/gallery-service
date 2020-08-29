DROP DATABASE IF EXISTS gallery;

CREATE SCHEMA gallery;

USE gallery;


CREATE TABLE gallery.image (
  id INT AUTO_INCREMENT,
  url VARCHAR(100),
  description VARCHAR(100),
  PRIMARY KEY(id)
);

CREATE TABLE gallery.properties (
  id INT AUTO_INCREMENT,
  description VARCHAR(300),
  starRating INT,
  reviewTotal VARCHAR(100),
  superhost BOOLEAN,
  location VARCHAR(100),
  images integer[]
);