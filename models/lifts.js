const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Lifts {
  static getAllLifts() {
    return database.raw(`SELECT id, name FROM lifts`)
  }
}

module.exports = Lifts
