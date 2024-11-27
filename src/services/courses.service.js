/**
 * @swagger
 * /api/v1/create/course:
 *   post:
 *     tags: ['Courses Service']
 *     summary: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_name:
 *                 type: string
 *                 description: The name of the course
 *                 example: "Advanced JavaScript"
 *               teacher:
 *                 type: string
 *                 description: The name of the teacher
 *                 example: "Dr. Jane Smith"
 *               course_table:
 *                 type: string
 *                 description: The schedule or timetable of the course
 *                 example: "Mon, Wed, Fri - 10:00 AM to 12:00 PM"
 *               max_students:
 *                 type: integer
 *                 description: The maximum number of students allowed
 *                 example: 50
 *     responses:
 *       201:
 *         description: Course created successfully
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
 *                       description: The unique ID of the course
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     course_name:
 *                       type: string
 *                       description: The name of the course
 *                       example: "Advanced JavaScript"
 *                     teacher:
 *                       type: string
 *                       description: The name of the teacher
 *                       example: "Dr. Jane Smith"
 *                     course_table:
 *                       type: string
 *                       description: The schedule of the course
 *                       example: "Mon, Wed, Fri - 10:00 AM to 12:00 PM"
 *                     max_students:
 *                       type: integer
 *                       description: The maximum number of students
 *                       example: 50
 *       400:
 *         description: Bad request. Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Send please course_name, teacher, course_table, max_students!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error!"
 */

/**
 * @swagger
 * /api/v1/courses:
 *   get:
 *     tags: ['Courses Service']
 *     summary: Get courses by teacher name
 *     parameters:
 *       - in: query
 *         name: teacher_name
 *         description: The name of the teacher to filter courses by
 *         required: false
 *         schema:
 *           type: string
 *           example: "Dr. Jane Smith"
 *     responses:
 *       200:
 *         description: List of courses
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
 *                         type: integer
 *                         description: Course ID
 *                       course_name:
 *                         type: string
 *                         description: Course name
 *                       teacher:
 *                         type: string
 *                         description: Teacher's name
 *                       course_table:
 *                         type: string
 *                         description: Course schedule
 *                       max_students:
 *                         type: integer
 *                         description: Maximum number of students
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/courses:
 *   put:
 *     tags: ['Courses Service']
 *     summary: Update course details
 *     parameters:
 *       - in: query
 *         name: course_id
 *         description: The ID of the course to update
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_name:
 *                 type: string
 *                 description: The name of the course
 *                 example: "Advanced JavaScript"
 *               teacher:
 *                 type: string
 *                 description: The teacher's name
 *                 example: "Dr. Jane Smith"
 *               course_table:
 *                 type: string
 *                 description: The schedule of the course
 *                 example: "Mon, Wed, Fri - 10:00 AM to 12:00 PM"
 *               max_students:
 *                 type: integer
 *                 description: The maximum number of students
 *                 example: 40
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Missing required fields or invalid input
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/courses:
 *   delete:
 *     tags: ['Courses Service']
 *     summary: Delete a course by ID
 *     parameters:
 *       - in: query
 *         name: course_id
 *         description: The ID of the course to delete
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

const { v4: uuidv4 } = require("uuid");
const { query } = require("../database/db");

const createCourse = async (req, res) => {
  try {
    const { course_name, teacher, course_table, max_students } = req.body;
    if ((course_name, teacher, course_table, max_students)) {
      const courses = await query(
        "insert into courses(id, course_name, teacher, course_table, max_students) values ($1, $2, $3, $4, $5) returning *",
        [uuidv4(), course_name, teacher, course_table, max_students]
      );
      res.status(201).send({
        data: courses.rows[0],
      });
    } else {
      res.status(400).send({
        status_code: 400,
        message:
          "Send please course_name, teacher, course_table, max_students!",
      });
    }
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message: "Internal server error!",
    });
  }
};
const getCourse = async (req, res) => {
  try {
    const { teacher_name } = req.query;
    const teacherName = teacher_name || null;

    query(
      "select * from courses where ($1::text is null or teacher = $1)",
      [teacherName],
      (err, result) => {
        if (err) throw err;
        res.send({
          data: result.rows,
        });
      }
    );
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message: "Internal server error!",
    });
  }
};

const updateCourse = (req, res) => {
  try {
    const { course_id } = req.query;
    const { course_name, teacher, course_table, max_students } = req.body;
    if (
      !course_id ||
      !course_name ||
      !teacher ||
      !course_table ||
      !max_students
    ) {
      return res.status(400).json({
        error:
          "required fields course_id on params, course_name on body, teacher on body, course_table on body, max_students on body",
      });
    }
    query(
      "update courses set course_name = $1, teacher = $2, course_table = $3, max_students = $4 where id = $5",
      [course_name, teacher, course_table, max_students, course_id],
      (err, result) => {
        if (err) throw err;

        if (result.rowCount === 0) {
          return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course updated successfully" });
      }
    );
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      message: "Internal server error!",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { course_id } = req.query;
    const result = await query(
      "delete from courses where id = $1 returning *",
      [course_id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({
        status: "success",
        message: `Course with ID ${course_id} has been deleted`,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: `Course with ID ${course_id} not found`,
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
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};
