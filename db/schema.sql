DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

-- create a table for departments
CREATE TABLE department 
(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- create a table for roles
CREATE TABLE role
(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (8,2),
  department_id INTEGER );

-- create a table for employees
CREATE TABLE employee 
(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR (30) NULL,
  role_id INTEGER,
  manager_id INTEGER
);