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
      console.log(allLifts)
      console.log(workouts)
      Promise.all([
      // console.log(workouts)
//     //
    ])})
  }
    // )

    //   static getUserWorkouts(req, res) {
    //     const id = req.params.user_id
    //     const workouts = Promise.all([Workouts.getWorkoutInfo(id)])
    //     const allLifts = Promise.all(workouts.map(workout => Workouts.getLiftInfo(workout.id)))
    //
    //     const workoutsWithLifts = workouts.map(workout => {
    //       const lifts = allLifts.find(lifts => lifts.some(lift => lift.workout_id === workout.id))
    //       return Object.assign({}, workout, { lifts })
    //     })
    //
    //     console.log(workoutsWithLifts)
    //
    //     return Object.assign({}, id, { workouts: workoutsWithLifts })
    //
    //
//
//     // Workouts.getWorkoutInfo(id)
//     // .then(data => {
//     //   return data.rows;
//     // })
//     // .then(workouts => {
//     //   return Promise.all(workouts.map(workout => Object.assign({}, workout, { lifts: Promise.resolve(Workouts.getLiftInfo(workout.id)) })));
//     // })
//     // .then(workoutsWithLifts => {
//     //   const result = workoutsWithLifts.map(wwl => wwl.lifts.map(l => l.data.rows));
//     //   console.log(result);
//     //   res.json(result);
//     // })
//
//     // Workouts.getWorkoutInfo(id)
//     // .then( data => {
//     //   const workouts = []
//     //   data.rows.forEach(workout => {
//     //     const workoutId = workout.id
//     //     Workouts.getLiftInfo(workoutId)
//     //     .then( singleWorkoutData => {
//     //       const lifts = []
//     //       singleWorkoutData.rows.forEach( aLift => {
//     //         lifts.push( { "name": aLift.name, "reps": aLift.reps, "weight": aLift.weight } )
//     //       })
//     //       return lifts
//     //     })
//     //     .then( lifts => {
//     //       const aSingleWorkout = { "id": workout.id, "date": workout.date, "focus": workout.focus, "lifts": lifts}
//     //       res.json(aSingleWorkout)
//     //     })
//     //   })
//     // })
//   }
}

module.exports = WorkoutsController
