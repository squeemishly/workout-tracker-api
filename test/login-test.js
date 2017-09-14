const assert = require('chai').assert
const request = require('request')
const app = require('../server')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)


describe('Login', () => {
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

  describe('/login', () => {
    it('should return a 200 status', done => {
      const userInfo = { "email": "xena@xena.com", "password": "password"}
      this.request.post('/login', { form: userInfo }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })

    it('should return a users info', done => {
      const userInfo = { "email": "xena@xena.com", "password": "password"}
      this.request.post('/login', { form: userInfo }, (err, res) => {
        if(err) { return done(err) }
        const user = JSON.parse(res.body)
        assert.hasAllKeys(user, ["id", "name", "email", "token"])
        done()
      })
    })

    it('should return 404 for incorrect password', done => {
      const userInfo = { "email": "xena@xena.com", "password": "kitty"}
      this.request.post('/login', { form: userInfo }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 404)
        done()
      })
    })

    it('should return 404 for incorrect email address', done => {
      const userInfo = { "email": "squee@boudi.com", "password": "kitty"}
      this.request.post('/login', { form: userInfo }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 404)
        done()
      })
    })
  })

  describe('/logout', () => {
    it('should return a 200 status', done => {
      const userInfo = { "id": 2, "token": "jlHxE2iQQYKgINkcwtsyZ0r4qLNjYs1wTNBeXcUgyg5VrFVscw5zMI8HcE1fQVWC" }
      this.request.post('/logout', { form: userInfo }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })
  })
})
