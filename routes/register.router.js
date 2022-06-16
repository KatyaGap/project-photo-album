const express = require('express');
const router = express.Router();
const {Users, Albums, Cards} = require('../db/models')
const {checkAuth} = require('../middlewares/checkAuth');
const bcrypt = require('bcrypt');

router.route('/')
  .get(checkAuth, async (req, res) => {
    res.render('register');
  })
  .post(checkAuth, async (req, res) => {
    try {
      const { email, name, password } = req.body;
      if (email && name && password) {
        const hashPass = await bcrypt.hash(password, Number(process.env.SALTROUNDS));
        const user = await Users.create({ email: email, login: name, password: hashPass });
				console.log(user)
				req.session.userId = user.id;
				console.log(req.session.userId)
				req.session.userLogin = user.login;
				console.log(req.session.userLogin)
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
      res.redirect('/register');
    }
  });
module.exports = router
