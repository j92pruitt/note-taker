const express = require('express');
const path = require('path');
const api = require('./routes/index');
const compression = require('compression');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing post data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Routing for all api calls
app.use('/api', api);

app.use( express.static('public') );

app.get('/notes', (req, res) =>
    res.sendFile( path.join(__dirname, '/public/notes.html') )
);

app.get('/*', (req, res) => 
    res.sendFile( path.join(__dirname, '/public/index.html') )
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
