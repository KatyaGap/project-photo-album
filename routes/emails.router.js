const express = require('express');

const router = express.Router();
const { Albums, Privates } = require('../db/models');

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const findAlbum = await Albums.findOne({ where: { id } });
  const emails = await Privates.findAll({ where: { albumId: findAlbum.id } });
  res.render('emails', { emails });
});

module.exports = router;
