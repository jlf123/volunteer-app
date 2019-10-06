const fs = require('fs');
const path = require('path');
const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccount = require('../src/server/firebase-account-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const events = [
    'Spring dance',
    'APEX Fun Run',
    'Book fair',
    'Book room',
    'Classroom Helpers',
    'Clothes Closet',
    'Culture Night',
    'Field trip',
    'Teacher Appreciation Week',
    'Test Event',
    'Thanksgiving luncheon',
    'Watch dogs',
    'Wednesday Folders',
    'Workroom'
];

const createEventsList = () => {
    const eventsRef = db.collection('events');

    events.map(eventName => eventsRef.add({ eventName, volunteers: [] }));
};

createEventsList();
