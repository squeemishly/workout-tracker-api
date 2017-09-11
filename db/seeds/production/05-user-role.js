exports.seed = (knex, Promise) => {
  return Promise.all([
    knex.raw(
      'INSERT INTO roles (name) VALUES (?)',
      ["user"]
    ),
  ])
}
