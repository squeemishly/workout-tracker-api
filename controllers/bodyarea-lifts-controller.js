const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class BodyareaLiftsController {
  static getLiftsByBodyarea(req, res) {
    const { id } = req.params
    database.raw(`SELECT bodyareas.id AS bodyarea_id, bodyareas.name AS bodyarea_name, lifts.id AS lift_id, lifts.name AS lift_name
                  FROM bodyareas
                  JOIN bodyarea_lifts
                  ON bodyareas.id = bodyarea_lifts.bodyarea_id
                  JOIN lifts
                  ON bodyarea_lifts.lift_id = lifts.id
                  WHERE bodyareas.id = ?
                  ORDER BY lifts.name;`, [id])
    .then(data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        const lifts = []
        data.rows.forEach( lift => {
          const liftId = lift.lift_id
          const liftName = lift.lift_name
          const liftObject = { id: liftId, name: liftName }
          lifts.push(liftObject)
        })
        const liftObject = { id: data.rows[0].bodyarea_id,  name: data.rows[0].bodyarea_name, lifts: lifts}
        return res.json(liftObject)
      }
    })
  }
}

module.exports = BodyareaLiftsController
