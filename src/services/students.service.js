/**
 * @swagger
 * /api/v1/get/students:
 *   get:
 *     tags: ['Students Service']
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: Get all students
 *
 */
/**
 * @swagger
 * /api/v1/get/enrolled-students:
 *   get:
 *     tags: ['Students Service']
 *     summary: Get all students who are enrolled in any course
 *     description: Retrieves a list of students who are registered in any course through the enrollments table.
 *     responses:
 *       200:
 *         description: A list of enrolled students.
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
 *                         description: The unique identifier of the student.
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       name:
 *                         type: string
 *                         description: The name of the student.
 *                         example: "Jane Doe"
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
 * /api/v1/create/student:
 *   post:
 *     tags: ['Students Service']
 *     summary: Create student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The full name of the student
 *                 example: "John Doe"
 *               age:
 *                 type: integer
 *                 description: The age of the student
 *                 example: 22
 *               main_way:
 *                 type: string
 *                 description: The student's main field of study
 *                 example: "Computer Science"
 *     responses:
 *       201:
 *         description: Created student!
 *       400:
 *         description: Invalid input data
 */
/**
 * @swagger
 * /api/v1/delete/student/{student_id}:
 *   delete:
 *     tags: ['Students Service']
 *     summary: Delete student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the student to delete
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Successfully deleted the student
 *       404:
 *         description: Student not found
 *       400:
 *         description: Invalid UUID format
 *       500:
 *         description: Internal server error
 */
const { v4: uuidv4 } = require("uuid");
const { query } = require("../database/db");

const createStudent = async (req, res) => {
  try {
    const uniqueId = uuidv4();
    const { name, age, main_way } = req.body;
    if (name && age && main_way) {
      const student = await query(
        "insert into students(id, name, age, main_way) values ($1, $2, $3, $4) returning *",
        [uniqueId, name, age, main_way]
      );
      res.status(201).send({
        data: student.rows[0],
      });
    } else {
      res.status(400).send({
        status_code: 400,
        message: "Send please name, age, main_way!",
      });
    }
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message: "Internal server error!",
    });
  }
};
const getAllStudents = async (req, res) => {
  const students = await query("select * from students");

  res.send({
    data: students.rows,
  });
};
const getEnrolledStudents = async (req, res) => {
  try {
    const result = await query(
      "select students.id, students.name from students where students.id in (select student_id from enrollments)"
    );
    res.send({
      data: result.rows,
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message: "Internal server error!",
    });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { student_id } = req.query;
    const result = await query(
      "delete from students where id = $1 returning *",
      [student_id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({
        status: "success",
        message: `User with ID ${student_id} has been deleted`,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: `User with ID ${student_id} not found`,
      });
    }
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message: "Internal server error!",
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  deleteStudent,
  getEnrolledStudents,
};
