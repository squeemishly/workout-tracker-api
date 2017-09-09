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
    ])
    .then(() => done())
  })

  it('should exist', () => {
    assert(app.get)
  })

  describe('/lifts', () => {
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
          assert.hasAllKeys(allLifts[0], ['id', 'name', 'bodyarea'])
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
          assert.hasAllKeys(lift[0], ["id", "name", "bodyarea"])
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
      it('can add a new lift', done => {
        const lift = { "lift": { "name": "Leg Press", "bodyarea": "Hamstrings" } }
        this.request.post('/api/v1/lifts', { form: lift }, (err, res) => {
          if(err) { return done(err) }
          const lift = JSON.parse(res.body)
          assert.equal(lift.length, 1)
          assert.hasAllKeys(lift[0], ["id", "name", "bodyarea"])
          done()
        })
      })

      // it('should return 400 if no name is included', done => {
      //   if(err) { return done(err) }
      //
      //   done()
      // })

    //   it('should return 400 if no bodyarea is included', done => {
    //     if(err) { return done(err) }
    //
    //     done()
    //   })
    })

    // describe('edit a lift', () => {
    //   it('can edit a lift', done => {
    //     if(err) { return done(err) }
    //
    //     done()
    //   })
    // })

    // describe('delete a lift', () => {
    //   it('can delete the lift', done => {
        // if(err) { return done(err) }
        //
        // done()
    //   })
    // })
  })
})
