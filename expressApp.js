import express from 'express';

const app = express();
const PORT = 4000;

// B1: Configure JSON parsing middleware
app.use(express.json());

// B1 & B3: Initialize in-memory array containing at least three sample employee task records
let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Rahul Sharma",
    status: "Pending",
    priority: "High"
  },
  {
    id: 2,
    taskName: "Setup Database Schema",
    assignedTo: "Priya Patel",
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: 3,
    taskName: "Implement Authentication",
    assignedTo: "Amit Kumar",
    status: "Pending",
    priority: "High"
  }
];

// Root endpoint for convenience
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Employee Task Management REST API (Express.js)",
    endpoints: [
      "GET /tasks",
      "GET /tasks/:id",
      "POST /tasks",
      "PUT /tasks/:id",
      "DELETE /tasks/:id"
    ]
  });
});

// B2: GET /tasks - Retrieve all employee tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// B2: GET /tasks/:id - Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Task ID must be a valid number"
    });
  }

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: `Task with ID ${taskId} not found`
    });
  }

  res.status(200).json(task);
});

// B2: POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body;

  // Validate required fields
  if (!taskName || !assignedTo || !status) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Fields 'taskName', 'assignedTo', and 'status' are required"
    });
  }

  // Determine ID
  let newId;
  if (id !== undefined && id !== null) {
    newId = Number(id);
    const existing = tasks.find(t => t.id === newId);
    if (existing) {
      return res.status(400).json({
        error: "Bad Request",
        message: `Task with ID ${newId} already exists`
      });
    }
  } else {
    // Auto-generate ID if not provided
    const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
    newId = maxId + 1;
  }

  const newTask = {
    id: newId,
    taskName: String(taskName),
    assignedTo: String(assignedTo),
    status: String(status),
    priority: priority ? String(priority) : "Medium"
  };

  tasks.push(newTask);

  // Return HTTP 201 Created with standard expected response structure
  res.status(201).json({
    message: "Task added successfully",
    task: newTask
  });
});

// B2: PUT /tasks/:id - Update task details
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Task ID must be a valid number"
    });
  }

  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: `Task with ID ${taskId} not found`
    });
  }

  const { taskName, assignedTo, status, priority } = req.body;

  // Update existing fields while preserving ID
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...(taskName !== undefined && { taskName: String(taskName) }),
    ...(assignedTo !== undefined && { assignedTo: String(assignedTo) }),
    ...(status !== undefined && { status: String(status) }),
    ...(priority !== undefined && { priority: String(priority) })
  };

  res.status(200).json({
    message: "Task updated successfully",
    task: tasks[taskIndex]
  });
});

// B2: DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Task ID must be a valid number"
    });
  }

  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: `Task with ID ${taskId} not found`
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully"
  });
});

// B4: 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// B1: Configure application to listen on port 4000
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
