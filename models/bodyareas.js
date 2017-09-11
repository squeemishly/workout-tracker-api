const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Bodyareas {
  static getAllBodyareas() {
    return database.raw(`SELECT id, name FROM bodyareas`)
  }
}

module.exports = Bodyareas
