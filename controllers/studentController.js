// controllers/studentController.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Student, Register } = require("../models/studentModel");
const JWT_SECRET = process.env.JWT_SECRET;

exports.getAllStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getSingleStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.addStudent = async (req, res) => {
  const { name, email, age, qualification, isPaid, isBack } = req.body;

  if (
    !name ||
    !email ||
    !age ||
    !qualification ||
    isPaid === undefined ||
    isBack === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const student = new Student({
      name,
      email,
      age,
      qualification,
      isPaid,
      isBack,
      username: null,
      password: null,
    });

    await student.save();
    res.status(200).json({ message: "Student Added Successfully", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student Deleted Successfully", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, qualification, isPaid, isBack } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(id, {
      name,
      age,
      qualification,
      isPaid,
      isBack,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated Successfully", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.register = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isUsername = await Student.findOne({ username });
    const isEmail = await Student.findOne({ email });

    if (isUsername) {
      return res.status(409).json({ message: "Username already exists" });
    } else if (isEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const student = new Register({
      name,
      email,
      age: null,
      qualification: null,
      isPaid: false,
      isBack: false,
      username,
      password: hashPassword,
    });

    await student.save();
    res.status(201).json({ message: "Registered successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Register.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const Token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", user, Token });
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
