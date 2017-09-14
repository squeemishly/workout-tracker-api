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
    database.raw(`SELECT id, password FROM users WHERE users.email = ?`, [email])
    .then( data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        const hash = data.rows[0].password
        const id = data.rows[0].id
        bcrypt.compare(password, hash, (err, response) => {
          const token = randtoken.generate(64)
          if (response === true) {
            database.raw(`UPDATE users SET token = ? WHERE id = ? RETURNING id, name, email, token`, [token, id])
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
}

module.exports = LoginController
