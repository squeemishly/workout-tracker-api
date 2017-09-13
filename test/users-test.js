const assert = require("chai").assert
const request = require("request")
const app = require("../server")

const environment = process.env.NODE_ENV || "test"
const configuration = require("../knexfile")[environment]
const database = require("knex")(configuration)


describe("Users", () => {
  before( done => {
    this.port = 9876
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done()
    })

    this.request = request.defaults({
      baseUrl: "http://localhost:9876"
    })
  })

  after( () => {
    this.server.close()
  })

  describe("POST /users", () => {
    it("should return a 200 status", done => {
      const newUser = { "name": "Rebecca P Czarnecki", "email": "rebecca@czarnecki.com", "password": "passwordify" }
      this.request.post("/api/v1/users", { form: newUser }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })

    it("should return ?????", done => {
      //// does this return a token? a user id? a unicorn?
      const newUser = { "name": "Rebecca P Czarnecki", "email": "rebecca@czarnecki.com", "password": "passwordify" }
      this.request.post("/api/v1/users", { form: newUser }, (err, res) => {
        if(err) { return done(err) }
        const user = JSON.parse(res.body)
        assert.equal(user.length, 1)
        assert.hasAllKeys(user[0], ["id", "name", "email"])
        done()
      })
    })

    it("should retun 400 if there is no name", done => {
      const newUser = { "name": "", "email": "rebecca@czarnecki.com", "password": "passwordify" }
      this.request.post("/api/v1/users", { form: newUser }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 400)
        done()
      })
    })

    it("should retun 400 if there is no email", done => {
      const newUser = { "name": "Rebecca P Czarnecki", "email": "", "password": "passwordify" }
      this.request.post("/api/v1/users", { form: newUser }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 400)
        done()
      })
    })

    it("should retun 400 if there is no password", done => {
      const newUser = { "name": "Rebecca P Czarnecki", "email": "rebecca@czarnecki.com", "password": "" }
      this.request.post("/api/v1/users", { form: newUser }, (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 400)
        done()
      })
    })
  })

  describe("GET /users/:id", () => {
    it("should return a 200", done => {
      this.request.get("/api/v1/users/2", (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 200)
        done()
      })
    })

    it("should return a single users information", done => {
      this.request.get("/api/v1/users/2", (err, res) => {
        if(err) { return done(err) }
        const user = JSON.parse(res.body)
        assert.equal(user.length, 1)
        assert.hasAllKeys(user[0], ["id", "name", "email", "role"])
        done()
      })
    })

    it("should return a 404 for user not found", done => {
      this.request.get("/api/v1/users/0", (err, res) => {
        if(err) { return done(err) }
        assert.equal(res.statusCode, 404)
        done()
      })
    })
  })
})
