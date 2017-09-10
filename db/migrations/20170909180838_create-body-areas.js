
exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE bodyareas(
      id SERIAL PRIMARY KEY NOT NULL,
      name TEXT,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE bodyareas`
  return knex.raw(dropQuery)
};
