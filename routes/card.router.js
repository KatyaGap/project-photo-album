const express = require('express');

const { Users, Albums, Cards } = require('../db/models');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const photos = await Cards.findAll()
   console.log(photos)
res.render('photos',{ photos })
})

.post(upload.single('image'), async (req, res) => {
  try {
    const card = await Cards.create(
      { ...req.body, image: req.file.path.replace('public', '') },
    );
    res.status(202).json({ card });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

router.route('/:id')
.get((req, res) => {
  res.render('editFoto')
})

.put(async (req, res) => {
  try {
    const { id } = req.params;
    await Cards.update({ title: req.body.title, description: req.body.description  }, { where: { id } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});




module.exports = router;
