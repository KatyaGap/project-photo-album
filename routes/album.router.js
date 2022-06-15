const express = require('express');
const async = require('hbs/lib/async');
const {Users, Albums, Cards} = require('../db/models')

const router = express.Router();

router.route('/:id')
  .delete(async (req, res) => {
    try {
      const result = await Albums.destroy({
        where:
          { id: req.params.id },
      });
      res.json({ result });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  })

module.exports = router;
