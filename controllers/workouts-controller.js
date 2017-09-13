const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class WorkoutsController {
  static getUserWorkouts(req, res) {
    const id = req.params.user_id
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
  }
}

module.exports = WorkoutsController
