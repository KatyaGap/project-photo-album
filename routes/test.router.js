const express = require("express");

const { Users, Albums, Cards, Privates } = require("../db/models");
const test = require("../middlewares/testmulter");

const router = express.Router();

router
  .route("/:id")
  .post(test.single("image"), async (req, res) => {
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
