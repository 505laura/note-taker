const express = require('express');

const fs = require('fs');

const app = express();

const serverPort = process.env.PORT || 5501;

app.use(express.static('public'));

app.get('/api/notes', async(req, res) => {
    const dbJSON = JSON.parse(await fs.promises.readFile('db.json'));
    return res.json(dbJSON);
})

app.use('/notes', express.static('public/notes.html'));
app.use('*', express.static('public/index.html'));




app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
})
