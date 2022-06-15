const express = require('express');
const { Users, Albums, Cards } = require('../db/models');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.route('/:d')
.get(async (req, res) => {
	const users = await Users.findAll({where: { user_id : id }});
	res.render('mainPage', { users });
});

module.exports = router;
