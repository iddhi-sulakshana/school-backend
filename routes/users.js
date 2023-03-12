const express = require("express");
const mongoose = require("mongoose");
const saveImage = require("../utils/saveImage");
const fs = require("fs");

const { User, validateUser } = require("../models/user");
const router = express.Router();

// get all the users
router.get("/", async (req, res) => {
  const users = await User.find({}).sort("name");
  res.send(users);
});
// get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");
  const user = await User.findById(id);
  if (user) return res.send(user);
  res.status(404).send("User not found");
});
// update user by id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const errorUser = validateUser(req.body);
  if (errorUser) return res.status(400).send(errorUser);

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (result) return res.send(result);

  res.status(404).send("User not found");
});
// update user image
router.patch("/:id", async (req, res) => {
  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const user = await User.findById(id);
  if (!user) return res.status(404).send("User not found");
  fs.unlink(`./public/${user.picture}`, (err) => {
    if (err) winston.error(err);
  });
  user.picture = await saveImage(picture, user.picture.split(".")[0]);
  await user.save();
  res.send(user);
});
module.exports = router;
