// Import required modules
const express = require('express');
const fs = require('fs');
const { uuid } = require('uuidv4');

// Create a new express app
const app = express();

// Get the port the server will run on
const serverPort = process.env.PORT || 5501;

// Serve static files from the public folder
app.use(express.static('public'));
// Use middlewares to pass data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const getJSON = async() => JSON.parse(await fs.promises.readFile('db.json'));

// Add endpoint for getting notes data
app.get('/api/notes', async(req, res) => {
    const dbJSON = await getJSON();
    return res.json(dbJSON);
})

// Endpoint for storing notes data
app.post('/api/notes', async(req, res) => {
    const {text, title} = req.body;
    const dbJSON =  await getJSON();
    const id = uuid();
    const newNotes = [...dbJSON, {text, title, id}];
    await fs.promises.writeFile('db.json', JSON.stringify(newNotes));
    return res.send(id);
});

// Endpoint for deleting notes data
app.delete('/api/notes/:id', async(req, res) => {
    const {id} = req.params;
    const dbJSON = await getJSON();
    const newNotes = dbJSON.filter((note) => note.id !== id);
    await fs.promises.writeFile('db.json', JSON.stringify(newNotes));
    res.send(id);
});

// Serve notes file 
app.use('/notes', express.static('public/notes.html'));
// Default to index file for all other routes
app.use('*', express.static('public/index.html'));

// Start listening on the correct port
app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
})
