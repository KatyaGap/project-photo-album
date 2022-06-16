const express = require('express');
const { Users, Albums, Cards } = require('../db/models');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.route('/:id')
.get(async (req, res) => {
	const { id } = req.params;
	const albums = await Albums.findAll({ where: { user_id: id }, raw: true });
	// const album = await Albums.findOne({ where: { user_id: id }, raw: true });
	// console.log('album', album);
	// res.locals.foreignUser = album.user_id;
	const notAdmin = await Users.findOne({ where: { id }, raw: true });
	res.locals.notAdminName = notAdmin.login;
	res.locals.notAdminId = notAdmin.id;
	console.log('notAdmin', notAdmin)
	console.log(res.locals.notAdminName);
	console.log(res.locals.notAdminId);
	function checkAdmin () {
		if (res.locals.notAdminId === res.locals.userId) {
			return true;
	};
}
	const check = checkAdmin()
	console.log(check)
	res.render('user', { albums, check});
})


module.exports = router;
