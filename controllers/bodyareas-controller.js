const Bodyareas = require('../models/bodyareas')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class BodyareasController {
 static getAllBodyareas(res) {
   Bodyareas.getAllBodyareas()
  //  database.raw(`SELECT id, name FROM bodyareas`)
   .then( data => {
     return res.json(data.rows)
   })
 }
  static findBodyarea(req, res) {
    const { id } = req.params
    database.raw(`SELECT id, name FROM bodyareas WHERE id = ?`, [id])
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
      database.raw(`INSERT INTO bodyareas (name, created_at) VALUES (?, ?) RETURNING id, name`, [name, new Date])
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
      database.raw(`UPDATE bodyareas SET name = ? WHERE id = ? RETURNING id, name`, [name, id])
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
    database.raw(`DELETE FROM bodyareas WHERE id = ?`, [id])
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
