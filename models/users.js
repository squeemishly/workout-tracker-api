const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Users {
  static createNewUser(name, email, hash, token) {
    return database.raw(`INSERT INTO users (name, email, password, token)
                          VALUES (?, ?, ?, ?)
                          RETURNING id, name, email, token`, [name, email, hash, token])
  }

  static findUser(id) {
    return database.raw(`SELECT users.id, users.name, email, roles.name AS role
                        FROM users
                        JOIN roles
                        ON users.role_id = roles.id
                        WHERE users.id = ?`, [id])
  }

  static findToken(id) {
    return database.raw(`SELECT token
                          FROM users
                          WHERE id = ?`, [id])
  }

  static verifyUser(id, token) {
    this.findToken(id)
    // database.raw(`SELECT token FROM users WHERE id = ?`, [id])
    .then(dbToken => {
      console.log(`dbToken: `, dbToken.rows[0].token)
      console.log(`token`, token)
      console.log(`answer: `, dbToken.rows[0].token == token)
      return dbToken.rows[0].token == token
    })
  }
}

module.exports = Users
