
exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE roles(
      id SERIAL PRIMARY KEY NOT NULL,
      name TEXT
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE roles`
  return knex.raw(dropQuery)
};
