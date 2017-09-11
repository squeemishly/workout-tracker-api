const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Lifts {
  static getAllLifts() {
    return database.raw(`SELECT id, name
                          FROM lifts`)
  }

  static findLift(id) {
    return database.raw(`SELECT id, name
                          FROM lifts
                          WHERE id = ?`, [id])
  }

  static createLift(name) {
    return database.raw(`INSERT INTO lifts (name, created_at)
                          VALUES (?, ?)
                          RETURNING id, name`, [name, new Date])
  }

  static updateLift(name, id) {
    return database.raw(`UPDATE lifts
                          SET name = ?
                          WHERE id = ?
                          RETURNING id, name`, [name, id])
  }

  static deleteLift(id) {
    return database.raw(`DELETE FROM lifts
                          WHERE id = ?`, [id])
  }
}

module.exports = Lifts
