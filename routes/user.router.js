const express = require('express');
const { Users, Albums } = require('../db/models');

const router = express.Router();

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const albums = await Albums.findAll({ where: { user_id: id }, raw: true });
  const notAdmin = await Users.findOne({ where: { id }, raw: true });
  res.locals.notAdminName = notAdmin.login;
  res.locals.notAdminId = notAdmin.id;
  function checkAdmin() {
    if (res.locals.notAdminId === res.locals.userId) {
      return true;
    }
  }
  const check = checkAdmin();
  res.render('user', { albums, check });
});

module.exports = router;
