const Lifts = require('../models/lifts')

class LiftsController {
  static getAllLifts(req, res) {
    Lifts.getAllLifts()
    .then( data => {
      return res.json(data.rows)
    })
  }

  static findLift(req, res) {
    const { id } = req.params
    Lifts.findLift(id)
    .then( data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        return res.json(data.rows)
      }
    })
  }

  static createLift(req, res) {
    const lift = req.body.lift
    const name = lift.name

    if (name === "") {
      res.sendStatus(400)
    } else {
      Lifts.createLift(name)
      .then( data => {
        return res.json(data.rows)
      })
    }
  }

  static updateLift(req, res) {
    const { id } = req.params
    const lift = req.body.lift
    const name = lift.name

    if (name === "") {
      res.sendStatus(400)
    } else {
      Lifts.updateLift(name, id)
      .then( data => {
        if (data.rows.length < 1) {
            res.sendStatus(404)
        } else {
          return res.json(data.rows)
        }
      })
    }
  }

  static deleteLift(req, res) {
    const { id } = req.params
    Lifts.deleteLift(id)
    .then(data => {
      if (data.rowCount < 1) {
        res.sendStatus(404)
      } else {
        res.sendStatus(200)
      }
    })
  }
}

module.exports = LiftsController
