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

  after( () => {
    this.server.close()
  })

  it('should exist', () => {
    assert(app.get)
  })
})
