const LiftsController = require('./controllers/lifts-controller')
const BodyareasController = require('./controllers/bodyareas-controller')

const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Workout Tracker API'

app.get('/api/v1/lifts', (req, res) => {
  LiftsController.getAllLifts(req, res)
})

app.get('/api/v1/lifts/:id', (req, res) => {
  LiftsController.findLift(req, res)
})

app.post('/api/v1/lifts', (req, res) => {
  LiftsController.createLift(req, res)
})

app.put('/api/v1/lifts/:id', (req, res) => {
  LiftsController.updateLift(req, res)
})

app.delete('/api/v1/lifts/:id', (req, res) => {
  LiftsController.deleteLift(req, res)
})

app.get('/api/v1/bodyareas', (req, res) => {
  BodyareasController.getAllBodyareas(res)
})

app.get('/api/v1/bodyareas/:id', (req, res) => {
  BodyareasController.findBodyarea(req, res)
})

app.post('/api/v1/bodyareas', (req, res) => {
  BodyareasController.createBodyareas(req, res)
})

app.put('/api/v1/bodyareas/:id', (req, res) => {
  BodyareasController.updateBodyarea(req, res)
})

app.delete('/api/v1/bodyareas/:id', (req, res) => {
  BodyareasController.deleteBodyarea(req, res)
})

app.get('/api/v1/bodyarea_lifts_by_bodyarea/:id', (req, res) => {
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
})

app.get('/api/v1/bodyareas_by_lift/:id', (req, res) => {
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
})

app.post('/api/v1/bodyareas/:bodyarea_id/lifts/:lift_id', (req, res) => {
  const bodyareaId = req.params.bodyarea_id
  const liftId = req.params.lift_id
  database.raw(`INSERT INTO bodyarea_lifts (lift_id, bodyarea_id) VALUES (?, ?)`, [bodyareaId, liftId])
  .then( data => {
    res.sendStatus(200)
  })
  .catch( () => { res.sendStatus(404) } )
})

app.delete('/api/v1/bodyareas/:bodyarea_id/lifts/:lift_id', (req, res) => {
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
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
