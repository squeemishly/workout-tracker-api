
exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE users(
      id SERIAL PRIMARY KEY NOT NULL,
      name TEXT,
      email TEXT,
      password TEXT,
      token TEXT,
      role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE users`
  return knex.raw(dropQuery)
};
