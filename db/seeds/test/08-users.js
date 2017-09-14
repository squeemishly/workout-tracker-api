const bcrypt = require('bcrypt')

const password = bcrypt.hashSync("password", 10);


exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('users').insert( { name: "Amanda Palmer", email: "afp@sademopunk.com", password: password, token: "", role_id: 2, created_at: new Date }),
    knex('users').insert( { name: "Boudi the Kitty", email: "perfection@imakitty.com", password: password, token: "", role_id: 2, created_at: new Date }),
  ])
}
