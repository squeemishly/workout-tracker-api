exports.seed = (knex, Promise) => {
  return Promise.all([
    knex.raw(
      'INSERT INTO workouts (user_id, focus_area, workout_date, created_at) VALUES (?, ?, ?, ?)',
      [2, "Chest", 'Sept-23-2017', new Date]
    ),
    knex.raw(
      'INSERT INTO workouts (user_id, focus_area, workout_date, created_at) VALUES (?, ?, ?, ?)',
      [3, "Bench", 'Sept-20-2017', new Date]
    ),
    knex.raw(
      'INSERT INTO workouts (user_id, focus_area, workout_date, created_at) VALUES (?, ?, ?, ?)',
      [3, "Squat", 'Sept-23-2017', new Date]
    ),
    knex.raw(
      'INSERT INTO workouts (user_id, focus_area, workout_date, created_at) VALUES (?, ?, ?, ?)',
      [4, "Squat", 'Sept-22-2017', new Date]
    ),
    knex.raw(
      'INSERT INTO workouts (user_id, focus_area, workout_date, created_at) VALUES (?, ?, ?, ?)',
      [4, "Shoulders", 'Sept-27-2017', new Date]
    ),
  ])
}
