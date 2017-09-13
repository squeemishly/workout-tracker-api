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
        console.log(hash)
        const token = randtoken.generate(64)
        Users.createNewUser(name, email, hash, token)
        // database.raw(`INSERT INTO users (name, email, password, token) VALUES (?, ?, ?, ?) RETURNING id, name, email`, [name, email, hash, token])
        .then( data => {
          res.json(data.rows)
        })
      })
    }
  }
}

module.exports = UsersController
