const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users, Albums, Cards } = require('../db/models');
const { checkAuth } = require('../middlewares/checkAuth');

router.route('/')
  .get(checkAuth, async (req, res) => {
    res.render('register');
  })
  .post(checkAuth, async (req, res) => {
    try {
      const { email, name, password } = req.body;
      if (email && name && password) {
        const hashPass = await bcrypt.hash(
          password,
          Number(process.env.SALTROUNDS)
        );
        const user = await Users.create({
          email,
          login: name,
          password: hashPass,
        });
        req.session.userId = user.id;
        req.session.userLogin = user.login;
        req.session.userEmail = user.email;
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
      res.redirect('/register');
    }
  });
module.exports = router;
