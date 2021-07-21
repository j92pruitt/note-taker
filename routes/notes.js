const notes = require('express').Router();
const { readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieve information stored in db.json
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then( (data) => res.json(JSON.parse(data)))
);

module.exports = notes
