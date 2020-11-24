const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    PORT: 3306,
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

const startScreen = [
    "View all Employees",
    "View all Employees by Department",
    "View all Departments",
    "View all Roles",
    "Add Employee",
    "Add Department",
    "Add Role",
    "Update Employee Role",
    "Remove Employee",
    "Remove Department",
    "Remove Role",
    "Exit"
];

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
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add departments",
            "View departments",
            "Delete departments",
            "Add roles",
            "View roles",
            "Delete roles",
            "Add employees",
            "View employees",
            "Update employee roles",
            "End"
        ]
    }).then(function(res) {
        console.log(res);
        switch (res.action) {
            case "Add departments":
                addDep();
                break;
            case "View departments":
                viewDep();
                break;
            case "Delete departments":
                delDep();
                break;
            case "Add roles":
                addRole();
                break;
            case "View roles":
                viewRole();
                break;
            case "Delete roles":
                delRole();
                break;
            case "Add employees":
                addEmp();
                break;
            case "View employees":
                viewEmp();
                break;
            case "Delete employees":
                delEmp();
                break;
            case "Update employee roles":
                updateRole();
                break;
            case "End":
                end();
                break;
        }
    });
}

function addDep(data) {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department",
            name: "Department name"
        }
    ]).then(function(res) {
        connection.query("INSERT INTO departments SET ?", {name: res.name}, function(error, res) {
            if (error) throw error;
        });
    }).then(function() {
        console.log(`-----Department Added!-----`);
    }).then(function() {
        start();
    });
}

function viewDep() {
    console.log("Departments: \n");
    connection.query("SELECT * FROM departments", function(err, res) {
        console.log(res);
        start();
    });
}

function viewRole() {
    let query = `SELECT title AS "Title" FROM roles`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        console.log(" ");
        console.table(chalk.yellow("All Roles"), results);
        start();
    });

}

function end() {
    console.log("All done!");
    connection.end();
    process.exit();
}