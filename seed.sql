INSERT INTO departments (name)
VALUES 
    ('Sales'), 
    ('Marketing'), 
    ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Manager', 80000, 1),
  ('Marketing Coordinator', 55000, 2),
  ('Software Engineer', 95000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, 1),
  ('Emily', 'Williams', 3, 2);