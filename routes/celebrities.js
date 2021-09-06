const Celebrity = require("../models/Celebrity");

const router = require("express").Router();

/* GET celebrities page */
router.get('/', (req, res, next) => {
	// get all the books from the db
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB);
			// console.log('this is the books route');
			res.render('celebrities/index', { celebrityList: celebritiesFromDB });
		})
		.catch(err => {
			// instead of console logging the error we now pass it to the 
			// error handler via next()
			next(err);
		})
})

router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrityForm');
});



// creating the celebrities id GET ROUTE

router.get('/:id', (req, res, next) => {
	console.log('Celebrities details');
	// get the book with the requested id from the db
	console.log(req.params);
	// const bookId = req.params.id;
	console.log(req.params.id);
	// get the book with the requested id
	Celebrity.findById(req.params.id)
		.then(celebrityFromDB => {
			console.log(celebrityFromDB);
			// render a detail view
			res.render('celebrities/show', { celebrity: celebrityFromDB });
		})
		.catch(err => {
			next(err);
		})
});




module.exports = router;
