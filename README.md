# Employee-Tracker-App

[![GitHub](https://img.shields.io/badge/Made%20by-%40Adellis95-orange)](https://github.com/Adellis95/Employee-Tracker-App)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Employee Tracker is a CLI applicaiton for building and maintaining companies employee data base. Employee allows managers or someone within the company to view all employees, roles, as well as departments. It also allows for adding and deleting employees, roles, departments and updating employees all from your CLI. Built on MySQL and leveraging modularity in the structure of Employee Tracker, it can scale appropriatley with a companies growth without reconfiguring the core structure of the internal employee data base.

## Table of Contents

- [Description](#description)
- [Requirements](#requirements)
- [User-Story](#user-story)
- [Demos](#demos)
- [Installation](#installation)
- [License](#license)

## Requirements

- Functional application.

- GitHub repository with a unique name and a README describing the project.

- The command-line application should allow users to:

  - Add departments, roles, employees

  - View departments, roles, employees

  - Update employee roles

  - Delete departments and roles

## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Demos

![Code](./Assets/Employee-Tracker-Code.gif)

![Department-Functionality](./Assets/Department-Functionality.gif)

![Roles-Functionality](./Assets/Roles-Functionality.gif)

![Employee-Functionality](./Assets/Employee-Functionality.gif)

## Installation

1. Clone the repository

```
git clone git@github.com:Adellis95/Employee-Tracker-App.git
```

2. Install dependencies

```
npm install
```

3. Create the database using the schema.sql and seeds.sql files.

- schema.sql

```
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments(
id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30)
);

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(8,2),
department_id INT,
FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
);
```

- seeds.sql

```
INSERT INTO departments
    (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
```

4. Run the server

```
node server.js
```

## License

MIT License

Copyright (c) 2020 Austin Ellis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
