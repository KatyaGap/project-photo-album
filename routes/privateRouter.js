const express = require('express');
const { Users, Albums, Cards, Privates } = require('../db/models');
const router = express.Router();



router.route('/:id')
  .get(async (req, res) => {
    res.sendStatus(200);
	})

.post(async (req, res) => {
	try {
		const { id } = req.params;
		console.log('id', id);
		const newPrivatePerson = await Privates.create({ private_email: req.body.private_email, albumId: id });
		const Album = await Albums.findOne({ where : { id: id}})
			const userId = Album.user_id
		res.json({ newPrivatePerson, userId });
 } catch (error) {
		console.log(error);
		res.json({ error });
	}
})


.delete(async (req, res) => {
	try {
		const { id } = req.params;
		const album = await Albums.findOne({ where: { id: req.params.id}});
		const userId = album.user_id;
		const result = await Privates.destroy({
			where:
				{ albumId: req.params.id,
					private_email: req.body.private_email
				 },
		});
		res.json({ result, userId });
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
})
module.exports = router;
