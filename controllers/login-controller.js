const Login = require('../models/login')
const Users = require('../models/users')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const bcrypt = require('bcrypt');
const saltRounds = 10;
const randtoken = require('rand-token')

class LoginController {
  static userLogin(req, res) {
    const { email, password } = req.body
    Login.findUser(email)
    .then( data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        const hash = data.rows[0].password
        const id = data.rows[0].id
        bcrypt.compare(password, hash, (err, response) => {
          if (response === true) {
            const token = randtoken.generate(64)
            Login.createUserToken(id, token)
            .then( userInfo => {
              res.status(200).json(userInfo.rows[0])
            })
          } else {
            res.sendStatus(404)
          }
        })
      }
    }).catch(err => { console.error(err); })
  }

  static userLogout(req, res) {
    const { id, token } = req.body
    Users.findToken(id)
    .then( tokenDB => {
      if (tokenDB.rows[0].token === token) {
        Login.removeToken(id)
        .then( data => {
          if (data.rowCount < 1) {
            res.sendStatus(404)
          } else {
            res.sendStatus(200)
          }
        })
      } else {
        res.sendStatus(404)
      }
    })
  }
}

module.exports = LoginController
