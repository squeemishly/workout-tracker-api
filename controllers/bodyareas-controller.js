const Bodyareas = require('../models/bodyareas')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class BodyareasController {
 static getAllBodyareas(res) {
   Bodyareas.getAllBodyareas()
   .then( data => {
     return res.json(data.rows)
   })
 }
  static findBodyarea(req, res) {
    const { id } = req.params
    Bodyareas.findBodyarea(id)
    .then(data => {
      if (data.rows.length < 1) {
       res.sendStatus(404)
      } else {
       return res.json(data.rows)
      }
    })
  }

  static createBodyareas(req, res) {
    const ba = req.body.bodyarea
    const name = ba.name

    if (name === "") {
      res.sendStatus(400)
    } else {
      Bodyareas.createBodyareas(name)
      .then( data => {
        return res.json(data.rows)
      })
    }
  }

  static updateBodyarea(req, res) {
    const { id } = req.params
    const ba = req.body.bodyarea
    const name = ba.name

    if (name === "") {
      res.sendStatus(400)
    } else {
      Bodyareas.updateBodyarea(id, name)
      .then(data => {
        if (data.rows.length < 1) {
          res.sendStatus(404)
        } else {
          return res.json(data.rows)
        }
      })
    }
  }

  static deleteBodyarea(req, res) {
    const { id } = req.params
    Bodyareas.deleteBodyarea(id)
    .then(data => {
      if (data.rowCount < 1) {
        res.sendStatus(404)
      } else {
        res.sendStatus(200)
      }
    })
  }
}

module.exports = BodyareasController
