const express = require('express');
const router = express.Router();
const {Users, Albums, Cards} = require('../db/models')
const {checkAuth} = require('../middlewares/checkAuth');
const bcrypt = require('bcrypt');

router.route('/')
  .get(async (req, res) => {
    const users = await Users.findAll();
    res.render('mainPage', { users });
  });

module.exports = router;
