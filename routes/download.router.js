const express = require('express');
const zip = require('express-zip');
const { Users, Albums, Cards, Privates } = require('../db/models');
const upload = require('../middlewares/multer.middleware');
const path = require('path');

const router = express.Router();
router
  .route("/:id")
	.get(async (req, res) => {
		const findAlbum = await Albums.findOne({ where: { id: req.params.id } });
		res.locals.albumId = findAlbum.id;
		res.locals.albumTitle = findAlbum.title;
		// console.log('albumTitle', res.locals.albumTitle);
		const albums = await Privates.findAll({ where: { albumId: findAlbum.id }, raw: true });
		if (albums.length) {
		const arr = albums.map(el => el.private_email);
		console.log('arrrrrrrrrrrrrrr', arr)
		if (arr.includes(res.locals.userId) || res.locals.userId === findAlbum.user_id) {
			const cards = await Cards.findAll({ where: { album_id: findAlbum.id }, raw: true })
			const arrImg = cards.map(el => el.image);
			const arrPath = arrImg.map(el => path.join(__dirname, el))
			const zipArr = []
			console.log('cardsssssssssss', arrPath)
			res.json(cards);
		}
		else res.json({message:200});
		} else {
			const cards = await Cards.findAll({ where: { album_id: findAlbum.id }, raw: true })
			// const arrImg = cards.map(el => el.image);
			const arrImg = cards.map(el => el.image);
			const arrPath = arrImg.map(el => path.join(__dirname, el));
			const result = arrPath.map( el => { return {path: el, name: 'photo.jpeg' }})
			console.log('result', result)
			// console.log('arrImg', arrImg)
			res.zip(result)
		}
	})


	module.exports = router;
