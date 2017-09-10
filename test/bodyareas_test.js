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
  })
})
