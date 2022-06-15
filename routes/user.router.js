const express = require('express');
const { Users, Albums, Cards } = require('../db/models');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.route('/:id')
.get(async (req, res) => {
	const { id } = req.params;
	console.log('===id===', id);

	const albums = await Albums.findAll({ where: { user_id: id }, raw: true });
	// res.locals.userName = 
	console.log('===albums===', albums);
	
	res.render('user', { albums });
});

module.exports = router;
