const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db/models');

router
  .route('/')
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
        } else res.redirect('/login');
      }
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
  });

module.exports = router;
