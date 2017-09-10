
exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE bodyarea_lifts(
      id SERIAL PRIMARY KEY NOT NULL,
      lift_id INTEGER REFERENCES lifts(id) ON DELETE CASCADE,
      bodyarea_id INTEGER REFERENCES bodyareas(id) ON DELETE CASCADE,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE bodyarea_lifts`
  return knex.raw(dropQuery)
};
