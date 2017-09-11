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
}

module.exports = BodyareaLifts
