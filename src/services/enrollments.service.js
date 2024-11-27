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
