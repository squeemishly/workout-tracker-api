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

  after( () => {
    this.server.close()
  })

  afterEach(done => {
    Promise.all([
      database.raw(`TRUNCATE lifts RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE bodyareas RESTART IDENTITY CASCADE`),
    ])
    .then(() => done())
  })

  it('should exist', () => {
    assert(app.get)
  })

    describe('bodyarea_lifts', () => {
      describe('GET bodyarea_lifts by bodyarea', () => {
        it('should return a 200 status code', done => {
          this.request.get('/api/v1/bodyarea_lifts_by_bodyarea/4', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 200)
            done()
          })
        })

        it('should return a list of lifts for a bodyarea', done => {
          this.request.get('/api/v1/bodyarea_lifts_by_bodyarea/4', (err, res) => {
            if(err) { return done(err) }
            const lifts = JSON.parse(res.body)
            assert.hasAllKeys(lifts, ["id", "name", "lifts"])
            assert.hasAllKeys(lifts.lifts[0], ["id", "name"])
            done()
          })
        })

        it('should return a 404 if the bodyarea does not exist', done => {
          this.request.get('/api/v1/bodyarea_lifts_by_bodyarea/0', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 404)
            done()
          })
        })
      })

      describe('GET /api/v1/bodyareas_by_lift/:id', () => {
        it('should return a 200', done => {
          this.request.get('/api/v1/bodyareas_by_lift/1', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 200)
            done()
          })
        })

        it('should return a list of bodyareas', done => {
          this.request.get('/api/v1/bodyareas_by_lift/1', (err, res) => {
            if(err) { return done(err) }
            const bodyareas = JSON.parse(res.body)
            assert.hasAllKeys(bodyareas, ["id", "name", "bodyareas"])
            assert.hasAllKeys(bodyareas.bodyareas[0], ["id", "name"])
            done()
          })
        })

        it('should return a 404 if the bodyarea does not exist', done => {
          this.request.get('/api/v1/bodyareas_by_lift/0', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 404)
            done()
          })
        })
      })

      describe('POST /api/v1/bodyareas/:id/lifts/:id', () => {
        it('should return a 200 response', done => {
          this.request.post('/api/v1/bodyareas/1/lifts/5', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 200)
            done()
          })
        })

        it('should return a 404 response if it cannot add to the database', done => {
          this.request.post('/api/v1/bodyareas/0/lifts/0', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 404)
            done()
          })
        })
      })

      describe('DELETE /api/v1/bodyareas/:id/lifts/:id', () => {
        it('should return a 200 response', done => {
          this.request.delete('/api/v1/bodyareas/1/lifts/1', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 200)
            done()
          })
        })

        it('should return a 404 response if the bodyarea does not exit', done => {
          this.request.delete('/api/v1/bodyareas/0/lifts/1', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 404)
            done()
          })
        })

        it('should return a 404 response if the lift does not exit', done => {
          this.request.delete('/api/v1/bodyareas/1/lifts/0', (err, res) => {
            if(err) { return done(err) }
            assert.equal(res.statusCode, 404)
            done()
          })
        })
      })
    })
})
