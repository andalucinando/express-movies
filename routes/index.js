const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// middleware to protect a route

const loginCheck = () => {
  return (req, res, next) => {
    // in node-basic-auth: req.session.user
    if (req.isAuthenticated()) {
      // proceed as planned
      next();
    } else {
      res.redirect('/login');
    }
  }
}

router.get('/profile', loginCheck(), (req, res, next) => {
  // using node-basic-auth: req.session.user
  const loggedInUser = req.user;
  res.render('profile', { user: loggedInUser })
});


module.exports = router;
