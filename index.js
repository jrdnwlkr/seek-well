const express = require("express");
const mysql = require("mysql");
const inquirer = require('inquirer');

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "12Monocle6152",

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

app.get("/createdb", (req, res) => {

  let sql = "CREATE DATABASE hr";

  db.query(sql, (err) => {

    if (err) {

      throw err;

    }

    res.send("Database created");

  });

});



inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is your user name?',
      name: 'username',
    },
    {
      type: 'password',
      message: 'What is your password?',
      name: 'password',
    },
    {
      type: 'password',
      message: 'Re-enter password to confirm:',
      name: 'confirm',
    },
  ])
  .then((response) =>
    response.confirm === response.password
      ? console.log('Success!')
      : console.log('You forgot your password already?!')
  );

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });