const signOut = require('../../functions/handlers/sign-out');
const signIn = require('../../functions/handlers/sign-in');
const search = require('../../functions/handlers/search');
const getAllDocuments = require('../../functions/handlers/get-all-documents');

module.exports = {
    search,
    signOut,
    signIn,
    getAllDocuments
};
