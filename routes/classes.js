const { request } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const {
  Class,
  validateClass,
  updateStudentCount,
} = require("../models/classe");
const router = express.Router();

// get all the classes
router.get("/", async (req, res) => {
  const classes = await Class.find({});
  res.send(classes);
});

// update student count of a class
router.get("/updateCount/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  res.send(await updateStudentCount(id));
});

// get class by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");
  const classe = await Class.findById(id);
  if (classe) return res.send(classe);
  res.status(404).send("Class not found");
});

// create a new class
router.post("/", async (req, res) => {
  const errorMsg = validateClass(req.body);
  if (errorMsg) res.status(400).send(errorMsg);
  let classe = await Class.findOne(req.body);
  if (classe) return res.status(400).send("Class already exists");
  classe = new Class(req.body);
  await classe.save();
  res.send(classe);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  const errorMsg = validateClass(req.body);
  if (errorMsg) res.status(400).send(errorMsg);

  let classe = await Class.findOne(req.body);
  if (classe) return res.status(400).send("Class already exists");

  classe = await Class.findByIdAndUpdate(id, req.body, { new: true });
  if (classe) return res.send(classe);
  res.status(404).send("Class not found");
});

// remove class using id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid class id");

  const result = await Class.findByIdAndDelete(id);
  if (result) return res.send(result);
  res.status(400).send("Class already deleted");
});

module.exports = router;
