const LiftsController = require('./controllers/lifts-controller')
const BodyareasController = require('./controllers/bodyareas-controller')
const BodyareaLiftsController = require('./controllers/bodyarea-lifts-controller')

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
  BodyareaLiftsController.getLiftsByBodyarea(req, res)
})

app.get('/api/v1/bodyareas_by_lift/:id', (req, res) => {
  BodyareaLiftsController.getBodyareasForALift(req, res)
})

app.post('/api/v1/bodyareas/:bodyarea_id/lifts/:lift_id', (req, res) => {
  BodyareaLiftsController.createBodyareaLift(req, res)
})

app.delete('/api/v1/bodyareas/:bodyarea_id/lifts/:lift_id', (req, res) => {
  BodyareaLiftsController.deleteBodyareaLift(req, res)
})

app.get('/api/v1/users/:user_id/workouts', (req, res) => {
  const id = req.params.user_id
  // database.raw(`SELECT workouts.focus_area AS focus, workouts.workout_date AS date, lifts.name, sets.reps, sets.weight
  //   FROM workouts
  //   JOIN workout_lifts
  //   ON workouts.id = workout_lifts.workout_id
  //   JOIN lifts
  //   ON workout_lifts.lift_id = lifts.id
  //   JOIN sets
  //   ON workout_lifts.id = sets.workout_lifts_id
  //   WHERE workouts.user_id = ?
  //   GROUP BY date, focus, name, reps, weight
  //   ORDER BY date;`, [id])
  // .then( data => {
  //   data.rows.forEach(workout => {
  //     console.log(workout)
  //   })
  // })
  database.raw(`SELECT id, focus_area AS focus, workout_date AS date FROM workouts WHERE user_id = ?`, [id])
  .then( data => {
    const workouts = []
    data.rows.forEach(workout => {
      const workoutId = workout.id
      database.raw(`SELECT lifts.name, sets.reps, sets.weight FROM workout_lifts JOIN lifts ON workout_lifts.lift_id = lifts.id JOIN sets ON workout_lifts.id = sets.workout_lifts_id WHERE workout_lifts.id = ? ORDER BY workout_lifts.id`, [workoutId])
      .then( singleWorkoutData => {
        const lifts = []
        singleWorkoutData.rows.forEach( aLift => {
          lifts.push( { "name": aLift.name, "reps": aLift.reps, "weight": aLift.weight } )
        })
        return lifts
      })
      .then( lifts => {
        const aSingleWorkout = { "id": workout.id, "date": workout.date, "focus": workout.focus, "lifts": lifts}
        res.json(aSingleWorkout)
      })
    })
  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
