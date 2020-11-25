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
            name: "name"
        }
    ]).then(function(res) {
        connection.query("INSERT INTO departments SET ?", 
        {
            department_name: res.name
        }, 
        function(error, res) {
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
        console.table(res);
        start();
    });
}

function delDep() {
    let query = `SELECT * FROM departments`;
    connection.query(query, function(err, res) {
        if (err) throw err;
        let deptChoice = res.map(data => ({
            value: data.id,
            name: data.name
        }));
        inquirer.prompt([
            {
                name: "dept",
                type: "list",
                message: "Choose department to delete.",
                choices: listDep
            }
        ]).then(answers => {
            let query = `DELETE FROM departments WHERE id = ${answers.dept}`;
            connection.query(query, 
                {
                    id: answers.id
                }, function(err, res) {
                    if (err) throw err;
                    console.table(res);
                    start();
                });
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of new role?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the salary of new role?",
            name: "salary"
        },
        {
            type: "list",
            message: "In which department is the new role?",
            name: "id",
            choices: listDep
        }
    ]).then(function(res) {
        connection.query("INSERT INTO roles SET ?", 
        {
            title: res.name,
            salary: res.salary,
            department_id: res.id
        }, function(error, res) {
            console.log(error);
            if (error) throw error;
        });
    }).then(function() {
        console.log(chalk.yellow(`-----Role Added!-----`));
    }).then(function() {
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

function delRole() {
    let query = `SELECT * FROM roles`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Select a role to delete:",
                name: "delRole",
                choices: function() {
                    let choiceArray = results.map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then(answer => {
            connection.query(`DELETE FROM roles WHERE ?`, 
            {
                title: answer.delRole
            });
            console.log(chalk.yellow(`-----Role Deleted!-----`));
            start();
        });
    });
}

function addEmp(data) {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        },
        {
            type: "list",
            message: "What is the employee's title?",
            name: "role",
            choices: listRoles
        }
    ]).then(function(res) {
        connection.query("INSERT INTO employees SET ?", 
        {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.role
        }, function(error, res) {
            if (error) throw error;
        });
    }).then(function() {
        console.log(chalk.yellow(`-----Employee Added!-----`));
    }).then(function() {
        start();
    });
}

function viewEmp() {
    console.log("Employees: \n");
    connection.query("SELECT * FROM employees", function(error, res) {
        console.table(res);
        start();
    });
}

function updateRole(data) {
    console.log("Updating Employee");
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update the role of?",
            name: "emp",
            choices: listEmp
        },
        {
            type: "list",
            message: "What is the employee's new title?",
            name: "role",
            choices: listRoles
        }
    ]).then(function(res) {
        connection.query(`UPDATE employees SET role_id = ${res.role} WHERE id = ${res.emp}`, 
        function(error, res) {
            if (error) throw error;
        });
    }).then(function() {
        console.log(`-----Employee Updated!-----`);
        console.table(chalk.yellow("Updated Employee"));
    }).then(function() {
        start();
    });
}

function end() {
    console.log("All done!");
    connection.end();
    process.exit();
}