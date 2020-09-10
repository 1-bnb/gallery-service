DROP DATABASE IF EXISTS gallery;

CREATE SCHEMA gallery;

USE gallery;


CREATE TABLE images (
  id SERIAL,
  url VARCHAR(100),
  description VARCHAR(100),
  PRIMARY KEY(id)
);

CREATE TABLE properties (
  id SERIAL,
  description VARCHAR(300),
  starRating DECIMAL,
  reviewTotal VARCHAR(100),
  superhost BOOLEAN,
  location VARCHAR(100),
  images integer[]
);