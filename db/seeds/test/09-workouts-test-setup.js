exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE workouts RESTART IDENTITY CASCADE')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO workouts (user_id, focus_area, workout_date, created_at) VALUES (?, ?, ?, ?)',
        [2, "Hamstrings", 'Sept-22-2017', new Date]
      ),
    ])
  })
}
