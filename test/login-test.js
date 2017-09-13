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

  describe('/login', () => {
    it('should return a 200 status', done => {
      const userInfo = { "email": "xena@xena.com", "password": "password"}
      this.request.get('/login', (err, res) => {
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
  })
})
