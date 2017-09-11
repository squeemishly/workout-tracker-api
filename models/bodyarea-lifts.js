const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class BodyareaLifts {
  static getLiftsByBodyarea(id) {
    return database.raw(`SELECT bodyareas.id AS bodyarea_id, bodyareas.name AS bodyarea_name, lifts.id AS lift_id, lifts.name AS lift_name
                  FROM bodyareas
                  JOIN bodyarea_lifts
                  ON bodyareas.id = bodyarea_lifts.bodyarea_id
                  JOIN lifts
                  ON bodyarea_lifts.lift_id = lifts.id
                  WHERE bodyareas.id = ?
                  ORDER BY lifts.name;`, [id])
  }

  static getBodyareasForALift(id) {
    return database.raw(`SELECT lifts.id AS lift_id, lifts.name AS lift_name, bodyareas.id AS bodyarea_id, bodyareas.name AS bodyarea_name
                  FROM lifts
                  JOIN bodyarea_lifts
                  ON lifts.id = bodyarea_lifts.lift_id
                  JOIN bodyareas
                  ON bodyarea_lifts.bodyarea_id = bodyareas.id
                  WHERE lifts.id = ?
                  ORDER BY bodyareas.name;`, [id])
  }

  static createBodyareaLift(bodyareaId, liftId) {
    return database.raw(`INSERT INTO bodyarea_lifts (lift_id, bodyarea_id)
                  VALUES (?, ?)`, [bodyareaId, liftId])
  }

  static deleteBodyareaLift(bodyareaId, liftId) {
    return database.raw(`DELETE FROM bodyarea_lifts
                  WHERE lift_id = ?
                  AND bodyarea_id = ?;`, [bodyareaId, liftId])
  }
}

module.exports = BodyareaLifts
