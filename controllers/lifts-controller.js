const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class LiftsController {
  static getAllLifts(req, res) {
    database.raw(`SELECT id, name FROM lifts`)
    .then( data => {
      return res.json(data.rows)
    })
  }

}

module.exports = LiftsController
