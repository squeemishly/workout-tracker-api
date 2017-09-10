exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE bodyareas RESTART IDENTITY CASCADE')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO bodyareas (name, created_at) VALUES (?, ?)',
        ["Chest", new Date]
      ),
      knex.raw(
        'INSERT INTO bodyareas (name, created_at) VALUES (?, ?)',
        ["Hamstrings", new Date]
      ),
      knex.raw(
        'INSERT INTO bodyareas (name, created_at) VALUES (?, ?)',
        ["Quads", new Date]
      ),
      knex.raw(
        'INSERT INTO bodyareas (name, created_at) VALUES (?, ?)',
        ["Lats", new Date]
      ),
      knex.raw(
        'INSERT INTO bodyareas (name, created_at) VALUES (?, ?)',
        ["Deltoids", new Date]
      )
    ])
  })
}
