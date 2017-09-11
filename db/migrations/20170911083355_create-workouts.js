
exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE workouts(
      id SERIAL PRIMARY KEY NOT NULL,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      focus_area TEXT,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  const dropQuery = `DROP TABLE workouts`
  return knex.raw(dropQuery)
};
