const express = require("express");
const mysql = require("mysql2");
const inquirer = require('inquirer');
const fs = require('fs');

const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "12Monocle6152!",
  database: "hr_db",

},
console.log(`Connected to the hr database.`));

db.connect((err) => {

  if (err) {

    throw err;

  }

  console.log("MySql Connected");

});

const app = express();
const PORT = 3000;

app.get("/createdb", (req, res) => {

  let sql = "CREATE DATABASE hr";

  db.query(sql, (err) => {

    if (err) {

      throw err;

    }

    res.send("Database created");

  });

});

// const seedStatements = fs.readFileSync('seed.sql', 'utf8');

// db.query(seedStatements, (err, results) => {
//   if (err) throw err;
//   console.log('Database seeded with sample data');
// });

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);

  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all Employees', 'Add an Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View all Departments', 'Add Department', 'Exit']
      }
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all Employee':
          viewAllEmployees();
          break;
        case 'Add an Employee':
          addEmployee();
          break;  
        case 'Update Employee Role':
          addEmployee();
          break;  
        case 'View all Roles':
          viewAllRoles();
          break;
        case 'View all Departments':
          viewAllDepartments();
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          break;
      }
    });
}

function viewAllEmployees() {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter employee's last name:",
      },
      {
        type: 'input',
        name: 'role_id',
        message: "Enter employee's role ID:",
      },
    ])
    .then((answers) => {
      db.query(
        'INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)',
        [answers.first_name, answers.last_name, answers.role_id],
        (err, results) => {
          if (err) throw err;
          console.log('Employee added successfully.');
          start();
        }
      );
    });
}

function viewAllRoles() {
  db.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  }
  )};

function viewAllDepartments() {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  }
  )};

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });