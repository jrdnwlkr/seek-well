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
        case 'View all Employees':
          viewAllEmployees();
          break;
        case 'Add an Employee':
          addEmployee();
          break;  
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View all Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View all Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
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

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: "Enter employee's ID:",
      },
      {
        type: 'input',
        name: 'new_role_id',
        message: "Enter new role ID:",
      },
    ])
    .then((answers) => {
      db.query(
        'UPDATE employees SET role_id = ? WHERE id = ?',
        [answers.new_role_id, answers.employee_id],
        (err, results) => {
          if (err) throw err;
          console.log('Employee role updated successfully.');
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

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: "Enter role title:",
      },
      {
        type: 'input',
        name: 'salary',
        message: "Enter role salary:",
      },
      {
        type: 'input',
        name: 'department_id',
        message: "Enter department ID:",
      },
    ])
    .then((answers) => {
      db.query(
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [answers.title, answers.salary, answers.department_id],
        (err, results) => {
          if (err) throw err;
          console.log('Role added successfully.');
          start();
        }
      );
    });
}

function viewAllDepartments() {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  }
  )};

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: "Enter department name:",
        },
      ])
      .then((answers) => {
        db.query(
          'INSERT INTO departments (name) VALUES (?)',
          [answers.name],
          (err, results) => {
            if (err) throw err;
            console.log('Department added successfully.');
            start();
          }
        );
      });
  }

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });