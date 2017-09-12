const assert = require('chai').assert
const request = require('request')
const app = require('../server')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)


describe('Lifts', () => {
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

  after( () => {
    this.server.close()
  })

  afterEach(done => {
    Promise.all([
      database.raw(`TRUNCATE lifts RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE bodyareas RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE bodyarea_lifts RESTART IDENTITY CASCADE`),
    ])
    .then(() => done())
  })

  describe('get all lifts', () => {
    it('should return a 200', done => {
      this.request.get('/api/v1/lifts', (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })

    it('should return a list of lifts', done => {
      this.request.get('/api/v1/lifts', (err, res) => {
        if(err) { return done(err) }
        const allLifts = JSON.parse(res.body)
        assert.equal(allLifts.length, 5)
        assert.hasAllKeys(allLifts[0], ['id', 'name'])
        done()
      })
    })
  })

  describe('get one lift', () => {
    it('should return a 200', done => {
      this.request.get('/api/v1/lifts/1', (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })

    it('should return a single lift', done => {
      this.request.get('/api/v1/lifts/1', (err, res) => {
        if(err) { return done(err) }
        const lift = JSON.parse(res.body)
        assert.equal(lift.length, 1)
        assert.hasAllKeys(lift[0], ["id", "name"])
        done()
      })
    })

    it('should return a 404 if the lift is not found', done => {
      this.request.get('/api/v1/lifts/0', (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 404)
        done()
      })
    })
  })

  describe('add a new lift', () => {
    it('should return details of the lift', done => {
      const lift = { "lift": { "name": "Leg Press" } }
      this.request.post('/api/v1/lifts', { form: lift }, (err, res) => {
        if(err) { return done(err) }
        const newLift = JSON.parse(res.body)
        assert.equal(newLift.length, 1)
        assert.hasAllKeys(newLift[0], ["id", "name"])
        done()
      })
    })

    it('should return 400 if no name is included', done => {
      const lift = { "lift": { "name": "" } }
      this.request.post('/api/v1/lifts', { form: lift }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 400)
        done()
      })
    })
  })

  describe('edit a lift', () => {
    it('can edit a lift and return the lift', done => {
      const lift = { "lift": { "name": "Bench" } }
      this.request.put('api/v1/lifts/1', { form: lift }, (err, res) => {
        if(err) { return done(err) }
        const editedLift = JSON.parse(res.body)
        assert.equal(editedLift.length, 1)
        assert.hasAllKeys(editedLift[0], ["id", "name"])
        assert.equal(editedLift[0].name, "Bench")
        assert.notEqual(editedLift[0].name, "Bench Press")
        done()
      })
    })

    it('returns a 404 if it receives an invalid lift id', done => {
      const lift = { "lift": { "name": "Bench" } }
      this.request.put('/api/v1/lifts/0', { form: lift }, (err, res) => {
        assert.equal(res.statusCode, 404)
        done()
      })
    })

    it('returns 400 with empty name field', done => {
      const lift = { "lift": { "name": "" } }
      this.request.put('api/v1/lifts/1', { form: lift }, (err, res) => {
        assert.equal(res.statusCode, 400)
        done()
      })
    })
  })

  describe('delete a lift', () => {
    it('returns a 200 status', done => {
      this.request.delete('api/v1/lifts/1', (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })

    it('returns a 404 status if it does not exist', done => {
      this.request.delete('api/v1/lifts/0', (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 404)
        done()
      })
    })
  })
})
