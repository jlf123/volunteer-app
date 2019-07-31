const express = require('express');
const app = express();

app.get('/healthcheck', (req, res) => {
    res.send('OK');
});

app.use('/view', express.static('dist'));

app.listen('8080', () => console.log('Volunteer App is running'));
