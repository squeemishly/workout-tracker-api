const Login = require('../models/login')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const bcrypt = require('bcrypt');
const saltRounds = 10;
const randtoken = require('rand-token')

class LoginController {
  static userLogin(req, res) {
    const email = req.body.email
    const password = req.body.password
    Login.findUser(email)
    .then( data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        const hash = data.rows[0].password
        const id = data.rows[0].id
        bcrypt.compare(password, hash, (err, response) => {
          const token = randtoken.generate(64)
          if (response === true) {
            Login.createUserToken(id, token)
            .then( userInfo => {
              res.status(200).json(userInfo.rows[0])
            })
          } else {
            res.sendStatus(404)
          }
        })
      }
    })
  }

  static userLogout(req, res) {
    const id = req.body.id
    database.raw(`UPDATE users SET token = NULL WHERE id = ?`, [id])
    .then( data => {
      res.sendStatus(200)
    })
  }
}

module.exports = LoginController
