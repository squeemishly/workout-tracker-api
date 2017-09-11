exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE roles RESTART IDENTITY CASCADE')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO roles (name) VALUES (?)',
        ["admin"]
      ),
    ])
  })
}
