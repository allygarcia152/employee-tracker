-- add data to department table
INSERT INTO department
  (name)
VALUES
  ('Entertainment'),
  ('Production'),
  ('Audience Feedback');

-- add data to role table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Superstar', 200000.00, 1),
  ('Comedian', 50000.00, 1),
  ('Muscian', 65000.00, 1),
  ('Stunt Man', 100000.00, 1),
  ('Showrunner', 200000.00, 2),
  ('Stage Manager', 80000.00, 2),
  ('Critic', 150.00, 3);

-- add data to employee table
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Miss', 'Piggy', 1, NULL),
  ('Fozzie', 'Bear', 2, 1),
  ('Animal', NULL , 3, 1),
  ('The Great', 'Gonzo', 4, 1),
  ('Kermit', 'The Frog', 5, NULL),
  ('Scooter', NULL, 6, 5),
  ('Statler', NULL, 7, NULL),
  ('Waldorf', NULL, 7, NULL);
  