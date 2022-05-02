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
    `SELECT 
    E.id, 
    E.first_name, 
    E.last_name, 
    R.title, 
    R.salary, 
    D.name AS department,
    CONCAT(M.first_name,' ', M.last_name) AS manager
    FROM employee E
    JOIN role R ON E.role_id = R.id,
    JOIN department D ON R.department_id = D.id
    LEFT JOIN employee M ON E.manager_id = M.id;
    `,
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
      db.query (
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

startup();
