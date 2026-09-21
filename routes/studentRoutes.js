const express = require('express');
const router = express.Router();
let students = require('../data/students');

/**
 * @route   GET /students
 * @desc    Get all students
 * @access  Public
 * @status  200 OK
 */
router.get('/', (req, res) => {
  res.status(200).json(students);
});

/**
 * @route   GET /students/:id
 * @desc    Get a single student by ID
 * @access  Public
 * @status  200 OK | 400 Bad Request | 404 Not Found
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Input: Student ID must be a number" });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  res.status(200).json(student);
});

/**
 * @route   POST /students
 * @desc    Create a new student
 * @access  Public
 * @status  201 Created | 400 Bad Request
 */
router.post('/', (req, res) => {
  const { name, course } = req.body;

  // Validate input
  if (
    !name ||
    !course ||
    typeof name !== 'string' ||
    typeof course !== 'string' ||
    !name.trim() ||
    !course.trim()
  ) {
    return res.status(400).json({
      message: "Invalid Input: Both 'name' and 'course' are required and cannot be empty"
    });
  }

  // Generate new unique ID
  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    message: "New Student Created",
    student: newStudent
  });
});

/**
 * @route   PUT /students/:id
 * @desc    Update an existing student by ID
 * @access  Public
 * @status  200 OK | 400 Bad Request | 404 Not Found
 */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Input: Student ID must be a number" });
  }

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  const { name, course } = req.body;

  if (!name && !course) {
    return res.status(400).json({
      message: "Invalid Input: Please provide at least 'name' or 'course' to update"
    });
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: "Invalid Input: 'name' cannot be empty" });
    }
    students[studentIndex].name = name.trim();
  }

  if (course !== undefined) {
    if (typeof course !== 'string' || !course.trim()) {
      return res.status(400).json({ message: "Invalid Input: 'course' cannot be empty" });
    }
    students[studentIndex].course = course.trim();
  }

  res.status(200).json({
    message: "Student updated successfully",
    student: students[studentIndex]
  });
});

/**
 * @route   DELETE /students/:id
 * @desc    Delete a student by ID
 * @access  Public
 * @status  200 OK | 400 Bad Request | 404 Not Found
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Input: Student ID must be a number" });
  }

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

module.exports = router;
