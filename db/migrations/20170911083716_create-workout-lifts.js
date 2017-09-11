
exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE workout_lifts(
      id SERIAL PRIMARY KEY NOT NULL,
      workout_id INTEGER REFERENCES workouts(id) ON DELETE CASCADE,
      lift_id INTEGER REFERENCES lifts(id) ON DELETE CASCADE,
      lift_order INTEGER,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE workout_lifts`
  return knex.raw(dropQuery)
};
