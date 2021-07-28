require("dotenv").config();

const DB_NAME = 'emosi2dona2';
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_URI = `${URI}/${DB_NAME}?retryWrites=true&w=majority`;

module.exports.dbName = DB_NAME;
module.exports.db = DB_URI;