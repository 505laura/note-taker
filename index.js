const express = require('express');

const app = express();

const serverPort = process.env.PORT || 5501;

app.use(express.static('public'));

app.use('/notes', express.static('public/notes.html'));
app.use('*', express.static('public/index.html'));

app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
})