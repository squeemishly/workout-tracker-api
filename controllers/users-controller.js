const Users = require('../models/users')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const bcrypt = require('bcrypt');
const saltRounds = 10;
const randtoken = require('rand-token')

class UsersController {
  static createNewUser(req, res) {
    const { name } = req.body
    const { email } = req.body
    const { password } = req.body
    if ( name === "" || email === "" || password === "" ) {
      res.sendStatus(400)
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        const token = randtoken.generate(64)
        Users.createNewUser(name, email, hash, token)
        .then( data => {
          res.json(data.rows)
        })
      })
    }
  }

  static findUser(req, res) {
    const { id } = req.params
    database.raw(`SELECT users.id, users.name, email, roles.name AS role FROM users JOIN roles ON users.role_id = roles.id WHERE users.id = ?`, [id])
    .then( data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        res.json(data.rows)
      }
    })
  }
}

module.exports = UsersController
