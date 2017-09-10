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
      // console.log("it's running")
      database.raw(`TRUNCATE lifts RESTART IDENTITY CASCADE`),
      database.raw(`TRUNCATE bodyareas RESTART IDENTITY CASCADE`),
    ])
    .then(() => done())
  })

  it('should exist', () => {
    assert(app.get)
  })

  describe('lifts', () => {
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

  describe('bodyareas', () => {
    describe('GET /api/v1/bodyareas', () => {
      it('returns a 200 status', done => {
        this.request.get('/api/v1/bodyareas', (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 200)
          done()
        })
      })

      it('should return a list of bodyareas', done => {
        this.request.get('/api/v1/bodyareas', (err, res) => {
          if(err) { return done(err) }
          const bodyAreas = JSON.parse(res.body)
          assert.equal(bodyAreas.length, 5)
          assert.hasAllKeys(bodyAreas[0], ["id", "name"])
          done()
        })
      })
    })

    describe('GET /api/v1/bodyareas/:id', () => {
      it('should return a 200 status', done => {
        this.request.get('/api/v1/bodyareas/1', (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 200)
          done()
        })
      })

      it('should return the bodyarea identified', done => {
        this.request.get('/api/v1/bodyareas/1', (err, res) => {
          if(err) { return done(err) }
          const bodyArea = JSON.parse(res.body)
          assert.equal(bodyArea.length, 1)
          assert.hasAllKeys(bodyArea[0], ["id", "name"])
          done()
        })
      })

      it('should return a 404 if the bodyarea does not exist', done => {
        this.request.get('/api/v1/bodyareas/0', (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 404)
          done()
        })
      })
    })

    describe('POST /api/v1/bodyareas', () => {
      it('should return a 200 status code', done => {
        const ba = { "bodyarea": { "name": "Triceps" } }
        this.request.post('/api/v1/bodyareas', { form: ba }, (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 200)
          done()
        })
      })

      it('should return the added bodyarea', done => {
        const ba = { "bodyarea": { "name": "Triceps" } }
        this.request.post('/api/v1/bodyareas', { form: ba }, (err, res) => {
          if(err) { return done(err) }
          const bodyArea = JSON.parse(res.body)
          assert.equal(bodyArea.length, 1)
          assert.hasAllKeys(bodyArea[0], ["id", "name"])
          done()
        })
      })

      it('should return a 400 if name is blank', done => {
        const ba = { "bodyarea": { "name": "" } }
        this.request.post('/api/v1/bodyareas', { form: ba }, (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 400)
          done()
        })
      })
    })

    describe('PUT /api/v1/bodyareas', () => {
      it('should return 200 status code', done => {
        const ba = { "bodyarea": { "name": "Biceps" } }
        this.request.put('/api/v1/bodyareas/1', { form: ba }, (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 200)
          done()
        })
      })

      it('should return the updated bodyarea', done => {
        const ba = { "bodyarea": { "name": "Biceps" } }
        this.request.put('/api/v1/bodyareas/1', { form: ba }, (err, res) => {
          if(err) { return done(err) }
          const bodyArea = JSON.parse(res.body)
          assert.equal(bodyArea.length, 1)
          assert.equal(bodyArea[0].name, "Biceps")
          assert.hasAllKeys(bodyArea[0], ["id", "name"])
          done()
        })
      })

      it('should return 400 if name is blank', done => {
        const ba = { "bodyarea": { "name": "" } }
        this.request.put('/api/v1/bodyareas/1', { form: ba }, (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 400)
          done()
        })
      })

      it('should return 404 if the ID does not exist', done => {
        const ba = { "bodyarea": { "name": "Biceps" } }
        this.request.put('/api/v1/bodyareas/0', { form: ba }, (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 404)
          done()
        })
      })
    })

    describe('DELETE /api/v1/bodyareas', () => {
      it('should return a 200 status code', done => {
        this.request.delete('/api/v1/bodyareas/1', (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 200)
          done()
        })
      })

      it('should return 404 for a bodyarea that does not exist', done => {
        this.request.delete('/api/v1/bodyareas/0', (err, res) => {
          if(err) { return done(err) }
          assert.equal(res.statusCode, 404)
          done()
        })
      })
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
      })
    })
  })
})
