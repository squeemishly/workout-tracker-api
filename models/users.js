const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Users {
  static createNewUser(name, email, hash, token) {
    return database.raw(`INSERT INTO users (name, email, password, token)
                          VALUES (?, ?, ?, ?)
                          RETURNING id, name, email`, [name, email, hash, token])
  }
}

module.exports = Users
