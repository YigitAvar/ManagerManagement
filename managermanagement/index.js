const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yigit123',
  database: 'manager_management'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Create a new employee
app.post('/employees', (req, res) => {
  const { username, displayname, phone, customermail, role } = req.body;
  const query = 'INSERT INTO employees (username, displayname, phone, customermail, role) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [username, displayname, phone, customermail, role], (err, result) => {
    if (err) {
      console.error('Error adding employee:', err);
      res.status(500).send('Error adding employee');
      return;
    }
    const newUser = { id: result.insertId, username, displayname, phone, customermail, role, enabled: true };
    console.log('New user added:', newUser);
    res.status(201).json(newUser);
  });
});

// Get all employees
app.get('/employees', (req, res) => {
  const query = 'SELECT ID as id, username, displayname, phone, customermail, role, enabled FROM employees';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).send('Error fetching employees');
      return;
    }
    const convertedResults = results.map(user => ({
      ...user,
      enabled: user.enabled === 1 // Convert 1/0 to true/false
    }));
    res.status(200).json(convertedResults);
  });
});

// Update employee enabled status
app.put('/employees/:id/enabled', (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;
  const enabledValue = enabled === true || enabled === 'true';

  if (!id) {
    res.status(400).send('Employee ID is required');
    return;
  }

  const query = 'UPDATE employees SET enabled = ? WHERE id = ?';
  db.query(query, [enabledValue, id], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).send('Error updating employee');
      return;
    }
    console.log(`Employee with ID ${id} updated to enabled: ${enabledValue}`);
    res.status(200).send('Employee updated successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});