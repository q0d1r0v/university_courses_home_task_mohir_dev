const express = require("express");

const {
  createStudent,
  getAllStudents,
  deleteStudent,
  getEnrolledStudents,
} = require("../services/students.service");
const {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../services/courses.service");
const { createEnrollment } = require("../services/enrollments.service");

const api = express.Router();

api.get("/api/v1/get/students", getAllStudents);
api.get("/api/v1/get-enrollment-students", getEnrolledStudents);
api.post("/api/v1/create/student", createStudent);
api.delete("/api/v1/delete/student", deleteStudent);

api.post("/api/v1/create/course", createCourse);
api.get("/api/v1/get/course", getCourse);
api.put("/api/v1/update/course", updateCourse);
api.delete("/api/v1/delete/course", deleteCourse);

api.post("/api/v1/create/enrollment", createEnrollment);
api.get("/api/v1/get-all/enrollments", getAllStudents);

module.exports = {
  api,
};
