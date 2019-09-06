const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccount = require('../src/server/config/firebase-account-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const addVolunteerFieldToEvents = async () => {
    const snapshots = db.collection('events').get();
    snapshots.map(snapshot => {
        
    })
}