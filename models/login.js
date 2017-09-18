const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Login {
  static findUser(email){
    return database.raw(`SELECT id, password
                        FROM users
                        WHERE users.email = ?`, [email])
  }

  static createUserToken(id, token) {
    return database.raw(`UPDATE users
                        SET token = ?
                        WHERE id = ?
                        RETURNING id, name, email, token`, [token, id])
  }

  static removeToken(id) {
    return database.raw(`UPDATE users
                        SET token = NULL
                        WHERE id = ?`, [id])
  }
}

module.exports = Login
