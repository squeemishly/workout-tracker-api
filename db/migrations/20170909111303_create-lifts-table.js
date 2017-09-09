
exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE lifts(
      id SERIAL PRIMARY KEY NOT NULL,
      name TEXT,
      bodyArea TEXT,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE lifts`
  return knex.raw(dropQuery)
};
