const express = require('express');

const { Cards } = require('../db/models');

const router = express.Router();

router
  .route('/:id')
  .get(async (req, res) => {
    const findCard = await Cards.findOne({ where: { id: req.params.id } });
    res.json(findCard);
  })

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { newTitle, newDescription } = req.body;
      await Cards.update(
        {
          photo_title: newTitle,
          description: newDescription,
        },
        { where: { id } },
      );
      const card = await Cards.findOne({ where: { id } });
      res.json(card);
    } catch (err) {
      console.log(err);
    }
  })

  .delete(async (req, res) => {
    try {
      await Cards.destroy({
        where: { id: req.params.id },
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });

module.exports = router;
