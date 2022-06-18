const express = require('express');
const router = express.Router();
const { Users, Albums, Cards } = require('../db/models');

router.route('/').get(async (req, res) => {
  const users = await Users.findAll();
  res.render('mainPage', { users });
});

module.exports = router;
