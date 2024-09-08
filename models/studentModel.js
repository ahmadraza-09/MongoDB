const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
  qualification: { type: String },
  isPaid: { type: Boolean },
  isBack: { type: Boolean },
});

const registerSchema = new Schema({
  name: { type: String },
  email: { type: String },
  age: { type: Number },
  qualification: { type: String },
  isPaid: { type: Boolean },
  isBack: { type: Boolean },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Student = mongoose.model("Students", studentSchema);
const Register = mongoose.model("Student", registerSchema);

module.exports = { Student, Register };
