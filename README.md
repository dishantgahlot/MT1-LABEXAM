# Employee Task Management Web Application

> **Subject:** Full Stack Development – Node.js Lab Examination (MT1-LABEXAM)  
> **Technologies:** Node.js (ES Modules), Built-in HTTP Module, Built-in FS Module, Express.js  
> **Database:** Not Required (In-Memory JavaScript Array of Objects)

---

## 1. Problem Statement

Develop an Employee Task Management Web Application using Node.js and Express.js.
The application demonstrates the working of the Node.js HTTP module, routing, handling different HTTP methods, serving static files using the FS module, and implementing REST APIs using the Express.js framework.

The application is implemented in separate modules as described below:
- **Part A:** Built-in HTTP and FS modules in `httpServer.js` (Port 3000)
- **Part B:** Express.js REST API with full CRUD operations in `expressApp.js` (Port 4000)

---

## 2. Project Structure

```text
EmployeeTaskManagement/
│
├── package.json               # Configured with ES Modules ("type": "module") and express
├── package-lock.json          # Dependency lockfile
├── .gitignore                 # Ignores node_modules/ and system artifacts
├── httpServer.js              # Part A: Native Node.js HTTP server (Port 3000)
├── expressApp.js              # Part B: Express.js REST API service (Port 4000)
├── README.md                  # Comprehensive documentation and lab guide
│
├── public/
│   └── index.html             # Static web dashboard served by FS module at /home
│
└── screenshots/               # Folder containing output screenshots of each task
```

---

## 3. Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Step 1: Install Dependencies
```bash
npm install
```

---

## 4. Running the Applications

Both applications run independently on their specified ports.

### Step 1: Start the HTTP Server (Part A - Port 3000)
Open a terminal:
```bash
node httpServer.js
```
**Expected Console Output:**
```text
HTTP Server running at http://localhost:3000
```

#### Test URLs in Browser:
- `http://localhost:3000/` &mdash; Welcome message in HTML format
- `http://localhost:3000/tasks` &mdash; List of employee tasks in JSON format
- `http://localhost:3000/about` &mdash; Employee task management application information
- `http://localhost:3000/home` &mdash; Static HTML page served using the built-in FS module

---

### Step 2: Start the Express Application (Part B - Port 4000)
Open another terminal:
```bash
node expressApp.js
```
**Expected Console Output:**
```text
Express Server running at http://localhost:4000
```

---

## 5. API Testing Using EchoAPI / Postman

Test the following REST API endpoints on `http://localhost:4000`:

| Method | URL | Description / Expected Result |
| :--- | :--- | :--- |
| `GET` | `http://localhost:4000/tasks` | Display all tasks |
| `GET` | `http://localhost:4000/tasks/1` | Display task with ID 1 |
| `POST` | `http://localhost:4000/tasks` | Add a new task (Status 201) |
| `PUT` | `http://localhost:4000/tasks/1` | Update task details |
| `DELETE` | `http://localhost:4000/tasks/1` | Delete task with ID 1 |

### Sample POST Request:
* **URL:** `http://localhost:4000/tasks`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body &rarr; raw &rarr; JSON:**
```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```
* **Expected Response (Status 201):**
```json
{
  "message": "Task added successfully",
  "task": {
    "id": 4,
    "taskName": "Develop REST API",
    "assignedTo": "Amit Kumar",
    "status": "Pending",
    "priority": "Medium"
  }
}
```

### Sample PUT Request:
* **URL:** `http://localhost:4000/tasks/1`
* **Method:** `PUT`
* **Headers:** `Content-Type: application/json`
* **Body &rarr; raw &rarr; JSON:**
```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```
* **Expected Response (Status 200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Completed",
    "priority": "High"
  }
}
```

### Sample DELETE Request:
* **URL:** `http://localhost:4000/tasks/1`
* **Method:** `DELETE`
* **Expected Response (Status 200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 6. Screenshots Checklist

Capture your screenshots and paste them inside the `screenshots/` directory:

1. [ ] Screenshot of HTTP Server running successfully in terminal (`node httpServer.js`)
2. [ ] Screenshot of browser accessing `http://localhost:3000/`
3. [ ] Screenshot of browser accessing `http://localhost:3000/tasks`
4. [ ] Screenshot of browser accessing `http://localhost:3000/about`
5. [ ] Screenshot of browser demonstrating static file serving using FS module at `http://localhost:3000/home`
6. [ ] Screenshot of Express Server running successfully in terminal (`node expressApp.js`)
7. [ ] EchoAPI screenshot for `GET http://localhost:4000/tasks`
8. [ ] EchoAPI screenshot for `GET http://localhost:4000/tasks/1`
9. [ ] EchoAPI screenshot for `POST http://localhost:4000/tasks`
10. [ ] EchoAPI screenshot for `PUT http://localhost:4000/tasks/1`
11. [ ] EchoAPI screenshot for `DELETE http://localhost:4000/tasks/1`
12. [ ] Screenshot of GitHub repository showing commit history (`git log --oneline --graph`)
