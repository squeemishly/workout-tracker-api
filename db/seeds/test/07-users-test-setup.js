const bcrypt = require('bcrypt')

const password = bcrypt.hashSync("password", 10);


exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('users').insert( { name: "Xena", email: "xena@xena.com", password: password, token: "", role_id: 2, created_at: new Date }),
  ])
}
