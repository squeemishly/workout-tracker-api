const bcrypt = require('bcrypt')

const password = bcrypt.hashSync("password", 10);


exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE users RESTART IDENTITY CASCADE')
  .then( () => {
    return Promise.all([
      knex('users').insert( { name: "Admin", email: "admin@admin.com", password: password, token: "", role_id: 1, created_at: new Date }),
    ])
  })
}
