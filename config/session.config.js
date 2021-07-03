  
// require session
const session = require('express-session');
 
// ADDED: require mongostore
const MongoStore = require('connect-mongo');

const { db, dbName } = require("./constants");
 
module.exports = app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "session secret (change it)",
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      },
      store: MongoStore.create({
        // <== ADDED !!!
        mongoUrl: process.env.MONGODB_URI || db,
 
        // ttl => time to live
        ttl: 1000 * 60 * 60 * 24 // 1000ms * 60sec * 60min * 24h => 1 day
      })
    })
  );
};