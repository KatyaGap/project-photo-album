const express = require('express');
const { Users, Albums, Cards } = require('../db/models');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.route('/:id')
.get(async (req, res) => {
	const { id } = req.params;
	const albums = await Albums.findAll({ where: { user_id: id } });
	// res.locals.userName = 
	res.render('user', { albums });
});

module.exports = router;
