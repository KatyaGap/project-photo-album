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
		const newPrivatePerson = await Privates.create({ email: req.body.privateEmail, albumId: id });
		res.json({ newPrivatePerson});
 } catch (error) {
		console.log(error);
		res.json({ error });
	}
})
module.exports = router;
