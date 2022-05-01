DROP TABLE IF EXISTS deparment;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

-- create a table for departments
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
);

-- create a table for roles
CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (8, 2),
  -- establish foreign key for deparment table
  department_id INTEGER,
  CONSTRAINT fk_department
    FOREIGN KEY (department_id)
    REFERENCES deparment(id)
    ON DELETE SET NULL
);

-- create a table for employees
CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_named VARCHAR(30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  -- establish foreign key for role table to get role title, salary, and department name
  role_id INTEGER
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
  -- create foreign key for manager id
  manager_id INTEGER NULL 
  CONSTRAINT fk_employee
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id)
    ON DELETE SET NULL
);