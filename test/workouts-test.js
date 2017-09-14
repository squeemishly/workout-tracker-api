const assert = require('chai').assert
const request = require('request')
const app = require('../server')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)


describe('Server', () => {
  before( done => {
    this.port = 9876
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done()
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })

  beforeEach(done => {
    database.seed.run()
    .then(() => done())
  })

  afterEach(done => {
    Promise.all([
      database.raw(`TRUNCATE lifts RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE bodyareas RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE bodyarea_lifts RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE workouts RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE workout_lifts RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE sets RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE roles RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE users RESTART IDENTITY CASCADE`),
    ])
    .then(() => done())
  })

  after( () => {
    this.server.close()
  })

  describe('GET /api/v1/users/:id/workouts', () => {
    it('should return a 200', done => {
      this.request.get('/api/v1/users/2/workouts', (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })

    it('should return a list of workouts for a particular user', done => {
      this.request.get('/api/v1/users/2/workouts', (err, res) => {
        if(err) { return done(err) }
        const workouts = JSON.parse(res.body)
        assert.equal(workouts.length, 2)
        assert.hasAllKeys(workouts[0], ["id", "date", "focus", "lifts"])
        assert.hasAllKeys(workouts[0].lifts[0], ["name", "reps", "weight", "workout_id"])
        done()
      })
    })
  })

  describe('GET /users/:user_id/workouts/:workout_id', done => {
    it('should return a 200 response', done => {
      this.request.get('/api/v1/users/2/workouts/1', (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })

    it('should return a single workout with a list of its lifts', done => {
      this.request.get('/api/v1/users/2/workouts/1', (err, res) => {
        if(err) { return done(err) }
        const workout = JSON.parse(res.body)
        assert.hasAllKeys(workout, ["id", "date", "focus", "lifts"])
        assert.hasAllKeys(workout.lifts[0], ["name", "reps", "weight"])
        done()
      })
    })
  })
})
