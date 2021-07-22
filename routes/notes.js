const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieve information stored in db.json
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then( (data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

notes.delete('/:id', (req, res) => {

    const id = req.params.id

    readAndDelete(id, './db/db.json');

    const response = {
        status: 'success',
        body: id,
    };

    res.json(response)
})

module.exports = notes
