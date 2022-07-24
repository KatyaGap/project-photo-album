const express = require('express');
const { Albums } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newAlbum = await Albums.create({
      title: req.body.title,
      user_id: res.locals.userId,
    });
    res.json(newAlbum);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = router;
