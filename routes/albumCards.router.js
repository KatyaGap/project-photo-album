const express = require('express');
const async = require('hbs/lib/async');
const {Users, Albums, Cards} = require('../db/models')
const router = express.Router();
const upload = require("../middlewares/multer.middleware");

router.route('/:id')
.get(async (req, res) => {
	const photos = await Cards.findAll({ where: { album_id: req.params.id } });
	console.log('photos', photos);
	const card = await Cards.findOne({ where: { album_id: req.params.id } });
	// console.log(card)
	// res.locals.AlbId = cardAlb.album_id;
	// console.log(res.locals.AlbId)
	res.render("photos", { photos, albId: req.params.id });
})

// добавление карточки
.post(upload.single("image"), async (req, res) => {
	try {
		const card = await Cards.create({
			...req.body,
			album_id: req.params.id,
			image: req.file.path.replace("public", ""),
		});
	console.log('card', card)
		res.json(card);
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
});

module.exports = router;
