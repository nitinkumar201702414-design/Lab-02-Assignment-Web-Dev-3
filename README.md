# Student Management REST API

Lab Assignment 2 – Web Dev III (Node.js & Express Backend)  
**Unit-2 | Marks: 2.5 | In-Class Lab**

A RESTful API built using Node.js and Express.js to perform CRUD operations on student records using in-memory array/JSON data, custom middleware, modular routing, and proper HTTP status code handling.

---

## 📁 Project Structure

```
student-managment-api/
├── app.js                     # Express application entry point
├── package.json               # Dependencies and npm scripts
├── postman_collection.json    # Preconfigured Postman test requests
├── routes/
│   └── studentRoutes.js       # Modular Express Router for /students
├── middleware/
│   └── logger.js              # Custom logger middleware (Method, URL, Timestamp)
└── data/
    └── students.js            # Initial in-memory student records
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** (Node package manager)
- **Postman** (for API testing)

### 2. Installation
Install project dependencies:
```bash
npm install
```

### 3. Running the Server

- **Start normally:**
  ```bash
  npm start
  ```
- **Start with live-reload (Node --watch):**
  ```bash
  npm run dev
  ```

The server will start on:  
`http://localhost:3000`

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/students`

| HTTP Method | Endpoint | Description | Success Status | Error Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/students` | Get all student records | `200 OK` | `500 Internal Server Error` |
| **GET** | `/students/:id` | Get student details by ID | `200 OK` | `400 Bad Request` / `404 Not Found` |
| **POST** | `/students` | Add a new student record | `201 Created` | `400 Bad Request` |
| **PUT** | `/students/:id` | Update student details by ID | `200 OK` | `400 Bad Request` / `404 Not Found` |
| **DELETE**| `/students/:id` | Remove a student record | `200 OK` | `400 Bad Request` / `404 Not Found` |

---

## 🧪 Testing with cURL

### 1. GET All Students
```bash
curl -X GET http://localhost:3000/students
```

### 2. GET Student by ID (Success)
```bash
curl -X GET http://localhost:3000/students/1
```

### 3. GET Student by ID (Not Found - 404)
```bash
curl -X GET http://localhost:3000/students/999
```

### 4. POST Add Student (Success - 201 Created)
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Sneha", "course": "MCA"}'
```

### 5. POST Add Student (Validation Failure - 400 Bad Request)
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name": ""}'
```

### 6. PUT Update Student (Success - 200 OK)
```bash
curl -X PUT http://localhost:3000/students/2 \
  -H "Content-Type: application/json" \
  -d '{"course": "MTech"}'
```

### 7. DELETE Student (Success - 200 OK)
```bash
curl -X DELETE http://localhost:3000/students/3
```

---

## 📮 Testing with Postman

1. Open **Postman**.
2. Click **Import** (top left).
3. Select or drag-and-drop the file [`postman_collection.json`](./postman_collection.json).
4. Run the imported requests against `http://localhost:3000`.

---

## ⚙️ Key Features & Rubric Compliance

- **No Database / Mongoose**: In-memory JSON/array store in `data/students.js`.
- **Modular Routing**: Clean separation with `express.Router()` in `routes/studentRoutes.js`.
- **Custom Middleware**: `middleware/logger.js` logs Method, URL, and Time for every request.
- **Robust Error Handling**: Handles missing parameters (400), non-existent resources (404), route not found (404), and unexpected failures (500).
