//Include inquirer needed for this application
const inquirer = require('inquirer');
const db = require('./db/connection');

//Create an array of questions for user input
const startup = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'directory',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
    },
  ])
    .then((data) => {
      console.log(data.directory);
      switch (data.directory) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;
        case "Exit":
          process.exit();
      }
    })
};

async function viewDepartments() {
  db.query(`SELECT * FROM department;`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    startup();
  });
};

async function viewRoles() {
  db.query(
    `SELECT role.*, department.name AS department_id
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id;`,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
      startup();
    }
  );
};

async function viewEmployees() {
  db.query(
    `SELECT employee.*, role.title AS job_title, role.salary AS salary FROM employee 
    JOIN role 
    ON employee.role_id = role.id`,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
      startup();
    }
  );
};

async function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'deptName',
      message: 'Please enter the name of the department you would like to add.',
    },
  ])
    .then((data) => {
      db.query(
        `INSERT INTO department 
      (name)
      VALUES
      ('?');`,
        [data.deptName],
        (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("This department has been added. Thank you.");
          startup();
        }
      )
    })
};

async function addRole() {
  db.query(`SELECT * FROM department;`, (err, results) => {
    let deptArr = [];
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++) {
      deptArr.push({ name: results[i].name, value: results[i].id });
    }

    inquirer.prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Please enter the title of the role you would like to add.',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Please enter the salary for this role.',
      },
      {
        type: 'list',
        name: 'deptId',
        message: 'Please choose which department this role will belong to.',
        choices: deptArr,
      },
    ])
      .then((data) => {
        db.query(
          `INSERT INTO role 
        (title, salary, department_id)
        VALUES
        (?,?,?);`,
          [data.roleTitle, data.roleSalary, data.deptId],
          (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("This role has been added.");
            startup();
          }
        )
      });
  });
};

async function addEmployee() {
  console.log("Please take note of the id number of the employee that will be the manager of the employee you would like to add to the system. You will need the id number to assign the new employee a manager. Thank you.");
  db.query(
    `SELECT * FROM employee;
    `,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
    }
  );
  db.query(`SELECT * FROM role;`, (err, results) => {
    let roleArr = [];
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++) {
      roleArr.push({ title: results[i].title, salary: results[i].salary, department_id: results[i].department_id, value: results[i].id });
    }

    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Please enter the first name of the employee you would like to add.',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Please enter the last name of the employee you would like to add.',
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Please choose which role employee will have.',
        choices: roleArr,
      },
      {
        type: 'number',
        name: 'managerId',
        message: 'Please enter the employee id of the person who will manage this employee.',
        default: 5
      }
    ])
    .then((data) => {
      db.query(
        `INSERT INTO employee 
      (first_name, last_name, role_id, manager_id)
      VALUES
      (?,?,?,?);`,
        [data.firstName, data.lastName, data.roleId, data.managerId],
        (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("This employee has been added.");
          startup();
        }
      )
    });

  });
};

async function updateRole() {
  console.log("Please take note of the id number of the role that you would like to assign to the employee as well as the id of the employee. Thank you.");
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title AS role_title FROM employee 
    JOIN role 
    ON employee.role_id = role.id`,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
    }
  );
  db.query(`SELECT * FROM employee;`, (err, results) => {
    let employeeArr = [];
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++) {
      employeeArr.push({ first_name: results[i].first_name, last_name: results[i].last_name, role_id: results[i].role_id, manager_id: results[i].manager_id, value: results[i].id });
    }

    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeName',
        message: 'Please choose which employee you would like to update.',
        choices: employeeArr,
      },
      {
        type: 'number',
        name: 'newRole',
        message: 'Please enter id number of the new role for this employee.',
      },
    ])
      .then((data) => {
        db.query(
          `UPDATE employee
          SET role_id = ? 
          WHERE id = ?`,
          [data.newRole, data.employeeName],
          (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("This role has been added.");
            startup();
          }
        )
      });
  });
};


startup();
