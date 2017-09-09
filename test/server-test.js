const assert = require('chai').assert
const request = require('request')
const app = require('../server')

describe('Server', () => {
  before( (done) => {
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

  describe('GET /lifts', () => {
    it('should return a 200', (done) => {
      this.request.get('/lifts', (err, res) => {
        assert.equal(res.statusCode, 200)
        done()
      })
    })
    // 
    // it('should return a list of lifts', (done) => {
    //   this.request.get()
    // })
  })
})
