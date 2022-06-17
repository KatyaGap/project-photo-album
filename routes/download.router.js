const express = require('express');
const zip = require('express-zip');
const { Users, Albums, Cards, Privates } = require('../db/models');
const upload = require('../middlewares/multer.middleware');
const path = require('path');

const router = express.Router();
router.route('/:id').get(async (req, res) => {
  const findAlbum = await Albums.findOne({ where: { id: req.params.id } });
  res.locals.albumId = findAlbum.id;
  res.locals.albumTitle = findAlbum.title;
  const albums = await Privates.findAll({
    where: { albumId: findAlbum.id },
    raw: true,
  });
  console.log('length', albums.length);
  if (albums.length) {
    const arr = albums.map((el) => el.private_email);
    // if (
    //   arr.includes(res.locals.userId) ||
    //   res.locals.userId === findAlbum.user_id
    // ) {
    const cards = await Cards.findAll({
      where: { album_id: findAlbum.id },
      raw: true,
    });
		function makeRandomStr(num) {
			let str = "";
			let letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			for (let i = 0; i <= num; i +=1 ) {
				str += letters.charAt(Math.floor(Math.random() * letters.length));
			}
			return str + '.jpeg';
		}
    const arrImg = cards.map((el) => el.image);
    const pathDir = __dirname.replace('/routes', '/public');
    const arrPath = arrImg.map((el) => path.join(pathDir, el));
    const result = arrPath.map((el) => ({
      path: el,
      name: makeRandomStr(5),
    }));
    console.log('----', result);
    res.zip(result);
    // res.json(cards);
    // } else res.json({ message: 200 });
  } else {
    const cards = await Cards.findAll({
      where: { album_id: findAlbum.id },
      raw: true,
    });
    const arrImg = cards.map((el) => el.image);
    const arrPath = arrImg.map((el) => path.join(__dirname, el));
    const result = arrPath.map((el) => {
      return { path: el, name: 'image-1655459831044-158391950.jpeg' };
    });
    res.zip(result);
  }
});

module.exports = router;
