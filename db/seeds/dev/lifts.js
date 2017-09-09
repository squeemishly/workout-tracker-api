exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE lifts RESTART IDENTITY')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO lifts (name, bodyArea, created_at) VALUES (?, ?, ?)',
        ["Bench Press", "Chest", new Date]
      ),
      knex.raw(
        'INSERT INTO lifts (name, bodyArea, created_at) VALUES (?, ?, ?)',
        ["Squat", "Hamstrings", new Date]
      ),
      knex.raw(
        'INSERT INTO lifts (name, bodyArea, created_at) VALUES (?, ?, ?)',
        ["Deadlift", "Hamstrings", new Date]
      ),
      knex.raw(
        'INSERT INTO lifts (name, bodyArea, created_at) VALUES (?, ?, ?)',
        ["Barbell Row", "Lats", new Date]
      ),
      knex.raw(
        'INSERT INTO lifts (name, bodyArea, created_at) VALUES (?, ?, ?)',
        ["Pull Ups", "Lats", new Date]
      )
    ])
  })
}
