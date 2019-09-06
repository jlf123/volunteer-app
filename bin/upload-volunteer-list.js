const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccount = require('../src/server/config/firebase-account-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const uploadVolunteerList = () => {
    const volunteersRef = db.collection('volunteers');
    fs.createReadStream(path.join(__dirname, 'member_list.csv'))
        .pipe(csv(['firstName', 'lastName']))
        .on('data', ({ firstName, lastName }) => {
            volunteersRef.add({
                firstName,
                lastName,
                volunteerHours: []
            })
            console.log('Added ' + firstName);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
};

uploadVolunteerList();
