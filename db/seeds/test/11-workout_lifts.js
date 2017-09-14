exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE workout_lifts RESTART IDENTITY CASCADE')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [1, 1, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [1, 2, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [2, 2, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [2, 3, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [3, 3, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [3, 4, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [4, 4, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [4, 5, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [5, 5, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [5, 1, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [6, 1, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO workout_lifts (workout_id, lift_id, lift_order, created_at) VALUES (?, ?, ?, ?)',
        [6, 2, 2, new Date]
      ),
    ])
  })
}
