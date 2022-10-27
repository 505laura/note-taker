const express = require('express');

const app = express();

const serverPort = process.env.PORT || 5501;

app.get('*', (req, res) => {
    res.send('Hello World');
})

app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
})