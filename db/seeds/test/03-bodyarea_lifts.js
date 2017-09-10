exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE bodyarea_lifts RESTART IDENTITY')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [1, 1]
      ),
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [2, 2]
      ),
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [2, 3]
      ),
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [3, 2]
      ),
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [3, 3]
      ),
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [4, 4]
      ),
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [4, 5]
      ),
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [5, 4]
      ),
      knex.raw(
        'INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)',
        [4, 5]
      ),
    ])
  })
}
