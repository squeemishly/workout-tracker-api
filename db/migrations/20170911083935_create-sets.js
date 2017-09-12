
exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE sets(
      id SERIAL PRIMARY KEY NOT NULL,
      workout_lifts_id INTEGER REFERENCES workout_lifts(id) ON DELETE CASCADE,
      reps INTEGER,
      weight FLOAT,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE sets`
  return knex.raw(dropQuery)
};
