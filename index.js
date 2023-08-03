const express = require("express");
const mysql = require("mysql2");
const inquirer = require('inquirer');

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

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);

  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all employees', 'Add an Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View all Departments', 'Add Department', 'Exit']
      }
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'View employees by department':
          viewEmployeesByDepartment();
          break;
        case 'View employees by role':
          viewEmployeesByRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          break;
      }
    });
}

function viewAllEmployees() {
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewEmployeesByDepartment() {
  // Implement your logic here
  // Need to prompt the user for a department and then query the database
  // to retrieve employees in that department.
}

function viewEmployeesByRole() {
  // Implement your logic here
  // Similar to viewEmployeesByDepartment, prompt the user for a role and then query the database
  // to retrieve employees with that role.
}


  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });