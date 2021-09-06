

const mongoose = require('mongoose');

const Celebrity = require('../models/Celebrity')

mongoose.connect('mongodb://localhost/express-movies');



const celebrity = [

    {
    name: "Brad Pit",
    occupation : "Actor",
    catchPhrase : "I love Hotdogs and Kriptonite bikelocks",
    },
          
    {
        name: "Jacky Brown",
        occupation : "Staff",
        catchPhrase : "Love kaufland on a sunday evening",
    },

    {
        name: "Nicolas Cage",
        occupation : "Superhero",
        catchPhrase : "Get me some hard drugs",
    }

]


Celebrity.insertMany(celebrity)
	.then(celebrity => {
		console.log(`Success - ${celebrity.length} Celebrity seeded to the database`);
		mongoose.connection.close();
	})
	.catch(err => {
		console.log(err);
	})