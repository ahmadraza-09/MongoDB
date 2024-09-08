const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/getallstudents", studentController.getAllStudent);
router.get("/getsinglestudents/:id", studentController.getSingleStudent);
router.post("/addstudents", studentController.addStudent);
router.delete("/deletestudent/:id", studentController.deleteStudent);
router.put("/updatestudent/:id", studentController.updateStudent);
router.post("/login", studentController.login);
router.post("/register", studentController.register);

module.exports = router;
