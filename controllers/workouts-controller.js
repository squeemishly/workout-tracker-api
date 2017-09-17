const Workouts = require('../models/workouts')
const User = require('../models/users')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class WorkoutsController {
  static getUserWorkouts(req, res) {
    const token = req.query.token
    const id = req.params.user_id
    const verifiedUser = User.verifyUser(id, token)
    if (verifiedUser) {
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
    } else {
      res.sendStatus(404)
    }
  }
}

module.exports = WorkoutsController
