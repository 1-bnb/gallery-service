// const nr = require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

//import database
const db = require('../db/index');
//import query models
let dbQueries = require('./models/properties');
var bodyParser = require('body-parser');

//send static files inside the public folder
app.use('/rooms/:id', express.static(path.join(__dirname, '../public')));
app.use( bodyParser.json() );
app.use(express.json());

app.get('/properties/:id', (req, res) => {
  let id = req.params.id;
  dbQueries.getProperties(id, (err, data) => {
    if (err) {
      res.status(400).send('error');
    } else {
      console.log('success')
      res.status(200).send(data);
    }
  });
});

app.put('/properties/:id', (req, res) => {
  let id = req.params.id;
  let photo = req.body;
  console.log(req.body);
  dbQueries.addPhoto(id, photo, (error, response) => {
    if (error) {
      res.status(400).send('error adding image');
    } else {
      console.log('success')
      res.status(201).send(response);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});