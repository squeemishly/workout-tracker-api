const Workouts = require('../models/workouts')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class WorkoutsController {
  static getUserWorkouts(req, res) {
    const id = req.params.user_id
    Workouts.getWorkoutInfo(id)
    .then( workouts =>
      Promise.all([
        workouts.rows,
        Promise.all(workouts.rows.map(workout => Workouts.getLiftInfo(workout.id) ))
      ])
    )
    .then(([workouts, allLifts]) => {
      const workoutObjects = workouts.map( workout => {
        const liftsData = allLifts.find(lifts => lifts.rows.some(lift => lift.workout_id === workout.id))
        const lifts = liftsData.rows
        return { "id": workout.id, "date": workout.date, "focus": workout.focus, "lifts": lifts }
      })
      return workoutObjects
    })
    .then( workouts => {
      res.json(workouts)
    })
  }
}

module.exports = WorkoutsController
