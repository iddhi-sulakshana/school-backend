const express = require("express");
const saveImage = require("../utils/saveImage");
const _ = require("lodash");
const fs = require("fs");
const winston = require("winston");
const mongoose = require("mongoose");

const { User, validateUser } = require("../models/user");
const { Student, validateStudent } = require("../models/student");

const router = express.Router();

// get all the students
router.get("/", async (req, res) => {
  const students = await Student.find({}).select("-_id -__v -parent._id");
  res.send(students);
});

// get student by their user id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");
  const student = await Student.findOne({ user: id })
    .select("-_id -__v -parent._id")
    .populate("user");
  if (!student) return res.status(404).send("Student not found");
  res.send(student);
});

// create a new student
router.post("/", async (req, res) => {
  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const { userBody, studentBody } = extractStudent(req.body);
  const errorUser = validateUser(userBody);
  if (errorUser) return res.status(400).send(errorUser);

  const exist = await User.findOne({ email: userBody.email });
  if (exist)
    return res.status(400).send("User already exists with existing email");

  const user = new User(userBody);
  studentBody.user = user._id.toHexString();

  const errorStudent = validateStudent(studentBody);
  if (errorStudent) return res.status(400).send(errorStudent);
  const student = new Student(studentBody);

  // starting session to perform task set
  // if anything goes wrong tasks will rollback
  const session = await User.startSession();
  try {
    session.startTransaction();
    // add session parameter for each save({session})
    // transactions only supported by replica set
    user.picture = await saveImage(picture, `profilePic/${user._id}`);
    await user.save();
    await student.save();
    console.log(user.picture);
    res.send(student);
    await session.commitTransaction();
  } catch (err) {
    fs.unlink(`./public/${user.picture}`, (err) => {
      winston.error(err);
    });
    res.status(400).send(err.message);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
});

// update a student by their user id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const { userBody, studentBody } = extractStudent(req.body);
  studentBody.user = id;
  const errorUser = validateUser(userBody);
  if (errorUser) return res.status(400).send(errorUser);
  const errorStudent = validateStudent(studentBody);
  if (errorStudent) return res.status(400).send(errorStudent);

  let result = await User.findByIdAndUpdate(id, userBody, { new: true });
  if (!result) return res.status(404).send("User not found");
  result = await Student.findOneAndUpdate({ user: id }, studentBody, {
    new: true,
  });
  res.send(result);
});

// delete a student by their user id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const session = await User.startSession();
  try {
    session.startTransaction();
    const student = await Student.findOneAndRemove({ user: id })
      .populate("user")
      .select("-_id -__v");
    await User.findByIdAndRemove(id);
    if (!student) return res.status(400).send("Student already deleted");
    fs.unlink(`./public/${student.user.picture}`, (err) => {
      winston.error(err);
    });
    res.send(student);
    await session.commitTransaction();
  } catch (err) {
    res.send(400).send(err.message);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
});

function extractStudent(object) {
  const final = {};
  final.userBody = _.pick(object, ["name", "email", "password"]);
  final.studentBody = _.pick(object, ["address", "school", "classe", "DOB"]);
  final.userBody.role = "student";
  final.studentBody.parent = {
    name: object.parentName,
    phone: object.parentPhone,
  };
  return final;
}

module.exports = router;
