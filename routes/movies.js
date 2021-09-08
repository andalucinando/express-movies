const Movie = require("../models/movie");

const router = require("express").Router();

/* GET celebrities page */
router.get('/', (req, res, next) => {
	// get all the books from the db
	Movie.find()
		.then(moviesFromDB => {
			console.log(moviesFromDB );
			// console.log('this is the books route');
			res.render('movies/index', { movieList: moviesFromDB  });
		})
		.catch(err => {
			// instead of console logging the error we now pass it to the 
			// error handler via next()
			next(err);
		})
})


router.get('/new', (req, res, next) => {
	res.render('movies/new.hbs');
});

router.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
      .then(movie => {
        res.render('movies/show.hbs', { movie });
      })
      .catch(err => {
        next(err);
      });
  });

  
router.post('/', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    console.log(title, genre, plot, cast)
    Movie.create({title, genre, plot, cast})
      .then(() => {
        res.redirect('/movies');
      })
      .catch(err => {
        next(err);
      })
  });

  router.post('/:id/delete', (req, res, next) => {
    Movie.findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.redirect('/movies');
      })
      .catch(err => {
        next(err);
      })
  });


  
router.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
      .then(movie => {
        res.render('movies/edit', { movie });
      })
      .catch(err => {
        next(err);
      });
  });
  
  module.exports = router;
  
