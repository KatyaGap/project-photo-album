const express = require('express');
const router = express.Router();
const {Users, Albums, Cards, Privates} = require('../db/models')
const {checkAuth} = require('../middlewares/checkAuth');
const bcrypt = require('bcrypt');

router.route('/:id')
  .get(async (req, res) => { 
		const { id } = req.params;
		const findAlbum = await Albums.findOne({ where : { id }})
		const emails = await Privates.findAll({ where: { albumId: findAlbum.id }});
    // res.json('emails', { emails });	
		res.render("emails", { emails } );
  });


module.exports = router;
