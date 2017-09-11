const BodyareaLifts = require('../models/bodyarea-lifts')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class BodyareaLiftsController {
  static getLiftsByBodyarea(req, res) {
    const { id } = req.params
    BodyareaLifts.getLiftsByBodyarea(id)
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

  static getBodyareasForALift(req, res) {
    const { id } = req.params
    database.raw(`SELECT lifts.id AS lift_id, lifts.name AS lift_name, bodyareas.id AS bodyarea_id, bodyareas.name AS bodyarea_name
                  FROM lifts
                  JOIN bodyarea_lifts
                  ON lifts.id = bodyarea_lifts.lift_id
                  JOIN bodyareas
                  ON bodyarea_lifts.bodyarea_id = bodyareas.id
                  WHERE lifts.id = ?
                  ORDER BY bodyareas.name;`, [id])
    .then( data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        const bodyareas = []
        data.rows.forEach( bodyarea => {
          const bodyareaId = bodyarea.bodyarea_id
          const bodyareaName = bodyarea.bodyarea_name
          const bodyareaObject = { "id": bodyareaId, "name": bodyareaName }
          bodyareas.push(bodyareaObject)
        })
        const liftObject = { "id": data.rows[0].lift_id, "name": data.rows[0].lift_name, "bodyareas": bodyareas }
        return res.json(liftObject)
      }
    })
  }

  static createBodyareaLift(req, res) {
    const bodyareaId = req.params.bodyarea_id
    const liftId = req.params.lift_id
    database.raw(`INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)`, [bodyareaId, liftId])
    .then( data => {
      res.sendStatus(200)
    })
    .catch( () => { res.sendStatus(404) } )
  }

  static deleteBodyareaLift(req, res) {
    const bodyareaId = req.params.bodyarea_id
    const liftId = req.params.lift_id
    database.raw(`DELETE FROM bodyarea_lifts WHERE lift_id = ? AND bodyarea_id = ?;`, [bodyareaId, liftId])
    .then( data => {
      if (data.rowCount < 1) {
        res.sendStatus(404)
      } else {
        res.sendStatus(200)
      }
    })
  }
}

module.exports = BodyareaLiftsController
