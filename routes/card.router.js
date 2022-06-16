const express = require("express");

const { Users, Albums, Cards } = require("../db/models");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const photos = await Cards.findAll();
    console.log(photos);
    res.render("photos", { photos });
  })

  .post(upload.single("image"), async (req, res) => {
    try {
      const card = await Cards.create({
        ...req.body,
        image: req.file.path.replace("public", ""),
      });
      res.status(202).json({ card });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });

router.route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const card = await Cards.findOne({ where: { id } });
      res.render("editFoto", { card });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  })

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { newTitle, newDescription } = req.body;
      await Cards.update(
        {
          photo_title: newTitle,
          description: newDescription,
        },
        { where: { id } },
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const result = await Cards.destroy({
        where:
          { id: req.params.id },
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });

module.exports = router;
