const express = require('express');
const { Users, Albums, Cards } = require('../db/models');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.route('/')
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

module.exports = router;
