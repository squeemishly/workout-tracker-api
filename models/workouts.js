const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Workouts {
  static getWorkoutInfo(id) {
    return database.raw(`SELECT id, focus_area AS focus, workout_date AS date
                          FROM workouts
                          WHERE user_id = ?`, [id])
  }

  static getLiftInfo(workoutId) {
    return database.raw(`SELECT workout_lifts.workout_id AS workout_id, lifts.name, sets.reps, sets.weight
                          FROM workout_lifts
                          JOIN lifts
                          ON workout_lifts.lift_id = lifts.id
                          JOIN sets
                          ON workout_lifts.id = sets.workout_lifts_id
                          WHERE workout_lifts.id = ?
                          ORDER BY workout_lifts.id`, [workoutId])
  }
}

module.exports = Workouts
