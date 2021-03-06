// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// session configuration

const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = process.env.MONGO_PASS; 

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		// for how long is the user logged in -> this would be one day 	
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: true,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: "mongodb://localhost/express-movies"
		})
	})
)
// end of session configuration

// default value for title local
const projectName = "express-movies";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here


const auth = require("./routes/auth");
app.use("/signup", auth);


const index = require("./routes/index");
app.use("/", index);


const celebrities = require('./routes/celebrities');
app.use("/celebrities", celebrities)


const movies = require('./routes/movies');
app.use("/movies", movies)




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes

require("./error-handling")(app);

module.exports = app;
