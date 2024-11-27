/**
 * @swagger
 * /api/v1/create/enrollment:
 *   post:
 *     tags: ['Enrollments Service']
 *     summary: Create a new enrollment
 *     description: Add a new enrollment record linking a student to a course with a specific enrollment date.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: The ID of the student being enrolled.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               course_id:
 *                 type: string
 *                 description: The ID of the course for enrollment.
 *                 example: "789e4567-e89b-12d3-a456-426614174111"
 *               enrollment_date:
 *                 type: string
 *                 format: date
 *                 description: The date of enrollment.
 *                 example: "2024-11-27"
 *     responses:
 *       201:
 *         description: Enrollment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the enrollment.
 *                       example: "456e4567-e89b-12d3-a456-426614174222"
 *                     student_id:
 *                       type: string
 *                       description: The ID of the student.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     course_id:
 *                       type: string
 *                       description: The ID of the course.
 *                       example: "789e4567-e89b-12d3-a456-426614174111"
 *                     enrollment_date:
 *                       type: string
 *                       format: date
 *                       description: The enrollment date.
 *                       example: "2024-11-27"
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   description: The status code of the error.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: "Send please student_id, course_id, enrolment_date!"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   description: The status code of the error.
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: "Internal server error!"
 */

/**
 * @swagger
 * /api/v1/get/enrollments:
 *   get:
 *     tags: ['Enrollments Service']
 *     summary: Retrieve all enrollments
 *     description: Get a list of all enrollments including their details.
 *     responses:
 *       200:
 *         description: A list of all enrollments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the enrollment.
 *                         example: "456e4567-e89b-12d3-a456-426614174222"
 *                       student_id:
 *                         type: string
 *                         description: The ID of the student.
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       course_id:
 *                         type: string
 *                         description: The ID of the course.
 *                         example: "789e4567-e89b-12d3-a456-426614174111"
 *                       enrollment_date:
 *                         type: string
 *                         format: date
 *                         description: The enrollment date.
 *                         example: "2024-11-27"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   description: The status code of the error.
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: "Internal server error!"
 */

const { v4: uuidv4 } = require("uuid");
const { query } = require("../database/db");

const createEnrollment = async (req, res) => {
  try {
    const { student_id, course_id, enrollment_date } = req.body;

    if ((student_id, course_id, enrollment_date)) {
      const result = await query(
        "insert into enrollments(id, student_id, course_id, enrollment_date) values ($1, $2, $3, $4) returning *",
        [uuidv4(), student_id, course_id, enrollment_date]
      );
      res.status(201).send({
        data: result.rows[0],
      });
    } else {
      res.status(400).send({
        status_code: 400,
        message: "Send please student_id, course_id, enrolment_date!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status_code: 500,
      message: "Internal server error!",
    });
  }
};

const getAllEnrollMents = async (req, res) => {
  const enrollments = await query("select * from enrollments");
  res.send({
    data: enrollments.rows,
  });
};

module.exports = {
  createEnrollment,
  getAllEnrollMents,
};
