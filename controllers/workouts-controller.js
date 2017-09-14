const Workouts = require('../models/workouts')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class WorkoutsController {
  static getUserWorkouts(req, res) {
    const id = req.params.user_id
    // Workouts.getWorkoutInfo(id)
    // .then(data => {
    //   return data.rows;
    // })
    // .then(workouts => {
    //   return Promise.all(workouts.map(workout => Object.assign({}, workout, { lifts: Promise.resolve(Workouts.getLiftInfo(workout.id)) })));
    // })
    // .then(workoutsWithLifts => {
    //   const result = workoutsWithLifts.map(wwl => wwl.lifts.map(l => l.data.rows));
    //   console.log(result);
    //   res.json(result);
    // })

    Workouts.getWorkoutInfo(id)
    .then( data => {
      const workouts = []
      data.rows.forEach(workout => {
        const workoutId = workout.id
        Workouts.getLiftInfo(workoutId)
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
