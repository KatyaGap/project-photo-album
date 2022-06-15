const express = require('express');
const router = express.Router();
const {Users, Albums, Cards} = require('../db/models')
const {checkAuth} = require('../middlewares/checkAuth');
const bcrypt = require('bcrypt');


router.route('/')
  .get((req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error(error);
        return res.sendStatus(500);
      }
      res.clearCookie('auth').redirect('/');
    });
  });


module.exports = router;
