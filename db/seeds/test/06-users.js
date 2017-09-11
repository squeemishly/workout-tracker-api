exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE users RESTART IDENTITY')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO users (name, email, password, role_id, created_at) VALUES (?, ?, ?, ?, ?)',
        ["Xena", "xena@xena.com", "password", 2, new Date]
      ),
      knex.raw(
        'INSERT INTO users (name, email, password, role_id, created_at) VALUES (?, ?, ?, ?, ?)',
        ["Amanda Palmer", "afp@sademopunk.com", "password", 2, new Date]
      ),
      knex.raw(
        'INSERT INTO users (name, email, password, role_id, created_at) VALUES (?, ?, ?, ?, ?)',
        ["Boudi the Cat", "perfection@imakitty.com", "password", 2, new Date]
      ),
      knex.raw(
        'INSERT INTO users (name, email, password, role_id, created_at) VALUES (?, ?, ?, ?, ?)',
        ["admin", "admin@admin.com", "password", 1, new Date]
      ),
    ])
  })
}
