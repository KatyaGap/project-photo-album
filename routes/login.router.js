const express = require('express');
const router = express.Router();
const {Users, Albums, Cards} = require('../db/models')
const {checkAuth} = require('../middlewares/checkAuth');
const bcrypt = require('bcrypt');

router.route('/')
  .get(async (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await Users.findOne({ where: { email } });
        const passCheck = await bcrypt.compare(password, user.password);
        if (user && passCheck) {
          req.session.userId = user.id;
					req.session.userLogin = user.login;
					req.session.userEmail = user.email;
          res.redirect('/');
        } else if (user) { 
					console.log("You pass uncorrect password")
					res.redirect('/login'); 
				} else {
					console.log("Email is not found")
					res.redirect('/login'); 
				}
      }
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
  });

module.exports = router;
