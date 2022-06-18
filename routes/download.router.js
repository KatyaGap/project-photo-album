const express = require('express');
const zip = require('express-zip');
const { Users, Albums, Cards, Privates } = require('../db/models');
const upload = require('../middlewares/multer.middleware');

const path = require('path');

function makeRandomStr(num) {
  let str = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i <= num; i += 1) {
    str += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return str + '.jpeg';
}

const router = express.Router();
router.route('/:id').get(async (req, res) => {
  const findAlbum = await Albums.findOne({ where: { id: req.params.id } });
  res.locals.albumId = findAlbum.id;
  res.locals.albumTitle = findAlbum.title;
  const albums = await Privates.findAll({
    where: { albumId: findAlbum.id },
    raw: true,
  });
  if (albums.length) {
    const arr = albums.map((el) => el.private_email);
    if (
      arr.includes(res.locals.userId) ||
      res.locals.userId === findAlbum.user_id
    ) {
      const cards = await Cards.findAll({
        where: { album_id: findAlbum.id },
        raw: true,
      });
      const arrImg = cards.map((el) => el.image);
      const pathDir = __dirname.replace('/routes', '/public');
      const arrPath = arrImg.map((el) => path.join(pathDir, el));
      const result = arrPath.map((el) => ({
        path: el,
        name: makeRandomStr(5),
      }));
      res.zip(result);
    } else alert('нет доступа');
  } else {
    const cards = await Cards.findAll({
      where: { album_id: findAlbum.id },
      raw: true,
    });
    const arrImg = cards.map((el) => el.image);
    const pathDir = __dirname.replace('/routes', '/public');
    const arrPath = arrImg.map((el) => path.join(pathDir, el));
    const result = arrPath.map((el) => ({
      path: el,
      name: makeRandomStr(5),
    }));
    res.zip(result);
  }
});

module.exports = router;
