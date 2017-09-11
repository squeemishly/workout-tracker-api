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
        this.createLifts(data, lifts)
        const liftObject = { id: data.rows[0].bodyarea_id,  name: data.rows[0].bodyarea_name, lifts: lifts}
        return res.json(liftObject)
      }
    })
  }

  static getBodyareasForALift(req, res) {
    const { id } = req.params
    BodyareaLifts.getBodyareasForALift(id)
    .then( data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        const bodyareas = []
        this.createBodyareas(data, bodyareas)
        const liftObject = { "id": data.rows[0].lift_id, "name": data.rows[0].lift_name, "bodyareas": bodyareas }
        return res.json(liftObject)
      }
    })
  }

  static createBodyareaLift(req, res) {
    const bodyareaId = req.params.bodyarea_id
    const liftId = req.params.lift_id
    BodyareaLifts.createBodyareaLift(bodyareaId, liftId)
    .then( data => {
      res.sendStatus(200)
    })
    .catch( () => { res.sendStatus(404) } )
  }

  static deleteBodyareaLift(req, res) {
    const bodyareaId = req.params.bodyarea_id
    const liftId = req.params.lift_id
    BodyareaLifts.deleteBodyareaLift(bodyareaId, liftId)
    .then( data => {
      if (data.rowCount < 1) {
        res.sendStatus(404)
      } else {
        res.sendStatus(200)
      }
    })
  }

  static createLifts(data, lifts) {
    data.rows.map( lift => {
      const liftId = lift.lift_id
      const liftName = lift.lift_name
      const liftObject = { id: liftId, name: liftName }
      return lifts.push(liftObject)
    })
  }

  static createBodyareas(data, bodyareas) {
    data.rows.forEach( bodyarea => {
      const bodyareaId = bodyarea.bodyarea_id
      const bodyareaName = bodyarea.bodyarea_name
      const bodyareaObject = { "id": bodyareaId, "name": bodyareaName }
      bodyareas.push(bodyareaObject)
    })
  }
}

module.exports = BodyareaLiftsController
