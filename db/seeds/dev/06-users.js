const bcrypt = require('bcrypt')

exports.seed = (knex, Promise) => {
  const pw = createPassword()
  return knex.raw('TRUNCATE users RESTART IDENTITY CASCADE')
  .then( () => {
    return Promise.all([
      knex.raw(
        'INSERT INTO users (name, email, password, token, role_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ["Xena", "xena@xena.com", pw, "", 2, new Date]
      ),
      knex.raw(
        'INSERT INTO users (name, email, password, token, role_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ["Amanda Palmer", "afp@sademopunk.com", pw, "", 2, new Date]
      ),
      knex.raw(
        'INSERT INTO users (name, email, password, token, role_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ["Boudi the Cat", "perfection@imakitty.com", pw, "", 2, new Date]
      ),
      knex.raw(
        'INSERT INTO users (name, email, password, token, role_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        ["admin", "admin@admin.com", pw, "", 1, new Date]
      ),
    ])
  })
}

const createPassword = () => {
  bcrypt.hash("password", 10, (err, hash) => {
    return hash
  })
}
