import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// In-memory array of employee tasks
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

// Create HTTP Server
const server = http.createServer((req, res) => {
  // Parse URL pathname
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // A2 & A3: Route: GET /
  if (pathname === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Employee Task Management - Welcome</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
            margin: 0;
          }
          .welcome-box {
            background: #ffffff;
            padding: 2.5rem 3rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 600px;
            border: 1px solid #e2e8f0;
          }
          h1 {
            color: #2563eb;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
          }
          p {
            color: #64748b;
            margin-bottom: 1.5rem;
          }
          .nav-links a {
            display: inline-block;
            margin: 0.25rem 0.5rem;
            padding: 0.6rem 1.2rem;
            color: white;
            background: #2563eb;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            font-size: 0.9rem;
          }
          .nav-links a:hover {
            background: #1d4ed8;
          }
        </style>
      </head>
      <body>
        <div class="welcome-box">
          <h1>Welcome to Employee Task Management</h1>
          <p>Full Stack Development &ndash; Node.js Native HTTP Server Module</p>
          <div class="nav-links">
            <a href="/home">Home (FS Static)</a>
            <a href="/tasks">Tasks (JSON)</a>
            <a href="/about">About</a>
          </div>
        </div>
      </body>
      </html>
    `);
  }
  // A2 & A3: Route: GET /tasks
  else if (pathname === '/tasks' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks, null, 2));
  }
  // A2: Route: GET /about
  else if (pathname === '/about' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>About - Employee Task Management</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            max-width: 720px;
            margin: 3rem auto;
            padding: 0 1.5rem;
            line-height: 1.6;
          }
          .about-card {
            background: #ffffff;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
          }
          h1 {
            color: #1e3a8a;
            margin-bottom: 0.75rem;
          }
          p {
            color: #475569;
            margin-bottom: 1rem;
          }
          ul {
            color: #334155;
            padding-left: 1.25rem;
            margin-bottom: 1.5rem;
          }
          li {
            margin-bottom: 0.5rem;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="about-card">
          <h1>About Employee Task Management</h1>
          <p>
            The Employee Task Management Web Application is designed to streamline task allocation,
            track project progress, and manage workflow efficiency across team members.
          </p>
          <h3>Application Architecture:</h3>
          <ul>
            <li><strong>Node.js HTTP Module:</strong> Custom lightweight web server handling request routing and HTTP verbs.</li>
            <li><strong>Node.js FS Module:</strong> Static file streaming for web interfaces without external dependencies.</li>
            <li><strong>In-Memory Task Store:</strong> JavaScript Array maintaining real-time task records.</li>
            <li><strong>Express.js REST API:</strong> High-performance CRUD API service running concurrently on port 4000.</li>
          </ul>
          <p>
            <a href="/">&larr; Back to Welcome</a> &nbsp;|&nbsp;
            <a href="/home">View Home Dashboard</a> &nbsp;|&nbsp;
            <a href="/tasks">View Tasks JSON</a>
          </p>
        </div>
      </body>
      </html>
    `);
  }
  // A2 & A4: Route: GET /home (Static File Serving Using FS Module)
  else if (pathname === '/home' && method === 'GET') {
    const staticFilePath = path.join(__dirname, 'public', 'index.html');
    
    fs.readFile(staticFilePath, 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Internal Server Error',
          message: 'Unable to read index.html from public directory'
        }));
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      }
    });
  }
  // A3: Route: POST /add-task
  else if (pathname === '/add-task' && method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        const { id, taskName, assignedTo, status, priority } = parsedBody;

        // A5: Validate required task details
        if (id === undefined || id === null || !taskName || !assignedTo || !status) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: 'Bad Request',
            message: 'Missing required fields: id, taskName, assignedTo, and status are all required'
          }));
        }

        // Check if ID already exists
        const existing = tasks.find(t => t.id === Number(id));
        if (existing) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: 'Bad Request',
            message: `Task with id ${id} already exists`
          }));
        }

        const newTask = {
          id: Number(id),
          taskName: String(taskName),
          assignedTo: String(assignedTo),
          status: String(status),
          priority: priority ? String(priority) : 'Medium'
        };

        tasks.push(newTask);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: 'Task added successfully',
          task: newTask
        }, null, 2));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Bad Request',
          message: 'Invalid JSON request payload'
        }));
      }
    });
  }
  // A5: Error Handling - 404 for Invalid Routes
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Not Found',
      message: `Cannot ${method} ${pathname}. Route does not exist.`
    }));
  }
});

// A1: Start Server and listen on port 3000
server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
