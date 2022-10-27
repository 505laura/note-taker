const express = require('express');

const fs = require('fs');

const { uuid } = require('uuidv4');

const app = express();

const serverPort = process.env.PORT || 5501;

app.use(express.static('public'));

const getJSON = async() => JSON.parse(await fs.promises.readFile('db.json'));

app.get('/api/notes', async(req, res) => {
    const dbJSON = await getJSON();
    return res.json(dbJSON);
})

app.post('/api/notes', async(req, res) => {
    const {text, title} = req.body;
    const dbJSON =  await getJSON();
    const newNotes = [...dbJSON, {text, title, id: uuid()}];
    await fs.promises.writeFile('db.json', JSON.stringify(newNotes));
});

app.delete('/api/notes/:id', async(req, res) => {
    const {id} = req.params;
    const dbJSON = await getJSON();
    const newNotes = dbJSON.filter((note) => note.id !== id);
    await fs.promises.writeFile('db.json', JSON.stringify(newNotes));
});

app.use('/notes', express.static('public/notes.html'));
app.use('*', express.static('public/index.html'));

app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
})
