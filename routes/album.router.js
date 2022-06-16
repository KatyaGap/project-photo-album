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
.get(async (req, res) => {
	const findAlbum = await Albums.findOne({ where: { id: req.params.id } });
	res.locals.albumId = findAlbum.id;
	res.locals.albumTitle = findAlbum.title;
	console.log('albumTitle', res.locals.albumTitle)
		res.json(findAlbum);
	})
	
	.post(async (req, res) => {
		const findAlbum = await Albums.findOne({ where: { id: req.params.id } });
	findAlbum.title = req.body.title;
		await findAlbum.save();
		res.json(findAlbum);
	})

module.exports = router;
