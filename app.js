const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Custom logger middleware (logs Method, URL, Time)
app.use(logger);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Student Management REST API",
    endpoints: {
      getAllStudents: "GET /students",
      getStudentById: "GET /students/:id",
      createStudent: "POST /students",
      updateStudent: "PUT /students/:id",
      deleteStudent: "DELETE /students/:id"
    }
  });
});

// Modular routing for Student API
app.use('/students', studentRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// Global error handling middleware (500 Internal Server Error)
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});

// Start the server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
