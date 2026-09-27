const express = require("express");
const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- Global Middleware --------------------
app.use(express.json());
app.use(logger);

// -------------------- Root route --------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management REST API is running.",
    endpoints: {
      "GET /students": "Get all students",
      "GET /students/:id": "Get a single student by id",
      "POST /students": "Create a new student",
      "PUT /students/:id": "Update an existing student",
      "DELETE /students/:id": "Delete a student",
    },
  });
});

// -------------------- Routes (Modular Routing) --------------------
app.use("/students", studentRoutes);

// -------------------- Error Handling --------------------
app.use(notFound);
app.use(errorHandler);

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
