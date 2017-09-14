exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE sets RESTART IDENTITY CASCADE')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [1, 8, 100, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [1, 8, 150, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [2, 10, 315, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [2, 10, 325, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [3, 5, 405, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [3, 5, 415, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [4, 3, 225, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [4, 3, 255, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [5, 8, 135, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [5, 8, 155, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [6, 10, 65, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [6, 10, 75, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [7, 12, 135, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [7, 12, 155, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [8, 20, 115, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [8, 20, 135, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [9, 5, 90, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [9, 5, 115, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [10, 3, 415, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [10, 3, 455, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [11, 5, 135, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [11, 5, 175, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [12, 8, 225, new Date]
      ),
      knex.raw(
        'INSERT INTO sets (workout_lifts_id, reps, weight, created_at) VALUES (?, ?, ?, ?)',
        [12, 8, 255, new Date]
      ),
    ])
  })
}
