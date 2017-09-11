const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Bodyareas {
  static getAllBodyareas() {
    return database.raw(`SELECT id, name FROM bodyareas`)
  }

  static findBodyarea(id) {
    return database.raw(`SELECT id, name FROM bodyareas WHERE id = ?`, [id])
  }

  static createBodyareas(name) {
    return database.raw(`INSERT INTO bodyareas (name, created_at) VALUES (?, ?) RETURNING id, name`, [name, new Date])
  }

  static updateBodyarea(id, name) {
    return database.raw(`UPDATE bodyareas SET name = ? WHERE id = ? RETURNING id, name`, [name, id])
  }

  static deleteBodyarea(id) {
    return database.raw(`DELETE FROM bodyareas WHERE id = ?`, [id])
  }
}

module.exports = Bodyareas
