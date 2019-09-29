const express = require('express');
const app = express();
const firebase = require('firebase');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { signOut, signIn, search, getAllDocuments } = require('./');
const serviceAccount = require('./firebase-account-key.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(
    bodyParser.json({
        type: ['application/json']
    })
);

app.get('/healthcheck', (req, res) => {
    res.send('OK');
});

app.post('/api/signout', async (req, res) => signOut(req, res, db));
app.post('/api/signin', async (req, res) => signIn(req, res, db));
app.get('/api/search', async (req, res) => search(req, res, db));
app.get('/api/volunteers', getAllDocuments({ type: 'volunteers', db }));
app.get(
    '/api/events',
    getAllDocuments({ type: 'events', db, select: 'eventName' })
);

app.use('/view', express.static('dist'));

app.listen('8080', () => console.log('Volunteer App is running'));
