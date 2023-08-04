const mysql = require('mysql2/promise');

async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12Monocle6152!',
    database: 'hr_db',
  });
  return connection;
}

async function seed() {
  const connection = await connectToDatabase();

  try {
    await connection.query(`INSERT INTO departments (name) VALUES ('Sales'), ('Marketing'), ('Engineering')`);

    await connection.query(`
      INSERT INTO roles (title, salary, department_id)
      VALUES
        ('Sales Manager', 80000, 1),
        ('Marketing Coordinator', 55000, 2),
        ('Software Engineer', 95000, 3)
    `);

    await connection.query(`
      INSERT INTO employees (first_name, last_name, role_id, manager_id)
      VALUES
        ('John', 'Doe', 1, NULL),
        ('Jane', 'Smith', 2, 1),
        ('Michael', 'Johnson', 3, 1),
        ('Emily', 'Williams', 3, 2)
    `);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    connection.end();
  }
}

seed();
