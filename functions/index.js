const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true
});
const signIn = require('./handlers/sign-in');
const signOut = require('./handlers/sign-out');
const search = require('./handlers/search');
const getAllDocuments = require('./handlers/get-all-documents');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

exports.signout = functions.https.onRequest((req, res) =>
    cors(req, res, async () => signOut(req, res, db))
);

exports.signin = functions.https.onRequest((req, res) =>
    cors(req, res, async () => signIn(req, res, db))
);

exports.search = functions.https.onRequest((req, res) =>
    cors(req, res, async () => search(req, res, db))
);

exports.volunteers = functions.https.onRequest((req, res) =>
    cors(req, res, () => getAllDocuments({ type: 'volunteers', db })(req, res))
);

exports.events = functions.https.onRequest((req, res) =>
    cors(req, res, () => getAllDocuments({ type: 'events', db })(req, res))
);
