const express = require('express');
const async = require('hbs/lib/async');
const {Users, Albums, Cards, Privates} = require('../db/models');
const privates = require('../db/models/privates');

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
	console.log('albumTitle', res.locals.albumTitle);
	const albums = await Privates.findAll({ where: { albumId: findAlbum.id }, raw: true });
	if (albums.length) {
	const arr = albums.map(el => el.private_email);	
	console.log('aaaaaaaa', res.locals.userEmail)
	console.log('arr', arr)
	if (arr.includes(res.locals.userEmail) || res.locals.userId === findAlbum.user_id) {
		res.json(findAlbum);

	}
	else res.json({message:200});
	} else {
		res.json(findAlbum)
	}
})
	
	.post(async (req, res) => {
		const findAlbum = await Albums.findOne({ where: { id: req.params.id } });
	findAlbum.title = req.body.title;
		await findAlbum.save();
		res.json(findAlbum);
	})

module.exports = router;
