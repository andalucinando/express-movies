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


router.get('/new', (req, res, next) => {
	res.render('celebrities/new.hbs');
});

router.get('/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
      .then(celebrity => {
        res.render('celebrities/show.hbs', { celebrity });
      })
      .catch(err => {
        next(err);
      });
  });

  
router.post('/', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
      .then(() => {
        res.redirect('/celebrities');
      })
      .catch(err => {
        next(err);
      })
  });

  router.post('/:id/delete', (req, res, next) => {
    Celebrity.findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.redirect('/celebrities');
      })
      .catch(err => {
        next(err);
      })
  });


  
router.get('/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
      .then(celebrity => {
        res.render('celebrities/edit', { celebrity });
      })
      .catch(err => {
        next(err);
      });
  });
  
  module.exports = router;
  
