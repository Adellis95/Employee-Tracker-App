const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    PORT: 3000,
    user: "root",
    password: "Mickey19",
    database: "employee_db"
});

connection.connect(err => {
    if (err) {
        console.log(chalk.white.bgRed(err));
        return;
    }
    console.log(chalk.green(`Connected to database. ThreadID: ${connection.threadId}`));
});

let listDep;
let listRoles;
let listEmp;

connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    listRoles = res.map(role => ({ name: role.title, value: role.id }));
});

connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    listDep = res.map(dep => ({ name: dep.name, value: dep.id }));
});

connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    listEmp = res.map(emp => ({ name: `${emp.first_name}${emp.last_name}`, value: emp.id }));
});

start();

function start() {

}