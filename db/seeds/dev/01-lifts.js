exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE lifts RESTART IDENTITY CASCADE')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO lifts (name, created_at) VALUES (?, ?)',
        ["Bench Press", new Date]
      ),
      knex.raw(
        'INSERT INTO lifts (name, created_at) VALUES (?, ?)',
        ["Squat", new Date]
      ),
      knex.raw(
        'INSERT INTO lifts (name, created_at) VALUES (?, ?)',
        ["Deadlift", new Date]
      ),
      knex.raw(
        'INSERT INTO lifts (name, created_at) VALUES (?, ?)',
        ["Barbell Row", new Date]
      ),
      knex.raw(
        'INSERT INTO lifts (name, created_at) VALUES (?, ?)',
        ["Pull Ups", new Date]
      )
    ])
  })
}
