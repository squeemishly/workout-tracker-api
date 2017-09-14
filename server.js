const LiftsController = require('./controllers/lifts-controller')
const BodyareasController = require('./controllers/bodyareas-controller')
const BodyareaLiftsController = require('./controllers/bodyarea-lifts-controller')
const WorkoutsController = require('./controllers/workouts-controller')
const UsersController = require('./controllers/users-controller')

const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

const bcrypt = require('bcrypt');
const saltRounds = 10;
const randtoken = require('rand-token')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Workout Tracker API'

app.get('/api/v1/lifts', (req, res) => {
  LiftsController.getAllLifts(req, res)
})

app.get('/api/v1/lifts/:id', (req, res) => {
  LiftsController.findLift(req, res)
})

app.post('/api/v1/lifts', (req, res) => {
  LiftsController.createLift(req, res)
})

app.put('/api/v1/lifts/:id', (req, res) => {
  LiftsController.updateLift(req, res)
})

app.delete('/api/v1/lifts/:id', (req, res) => {
  LiftsController.deleteLift(req, res)
})

app.get('/api/v1/bodyareas', (req, res) => {
  BodyareasController.getAllBodyareas(res)
})

app.get('/api/v1/bodyareas/:id', (req, res) => {
  BodyareasController.findBodyarea(req, res)
})

app.post('/api/v1/bodyareas', (req, res) => {
  BodyareasController.createBodyareas(req, res)
})

app.put('/api/v1/bodyareas/:id', (req, res) => {
  BodyareasController.updateBodyarea(req, res)
})

app.delete('/api/v1/bodyareas/:id', (req, res) => {
  BodyareasController.deleteBodyarea(req, res)
})

app.get('/api/v1/bodyarea_lifts_by_bodyarea/:id', (req, res) => {
  BodyareaLiftsController.getLiftsByBodyarea(req, res)
})

app.get('/api/v1/bodyareas_by_lift/:id', (req, res) => {
  BodyareaLiftsController.getBodyareasForALift(req, res)
})

app.post('/api/v1/bodyareas/:bodyarea_id/lifts/:lift_id', (req, res) => {
  BodyareaLiftsController.createBodyareaLift(req, res)
})

app.delete('/api/v1/bodyareas/:bodyarea_id/lifts/:lift_id', (req, res) => {
  BodyareaLiftsController.deleteBodyareaLift(req, res)
})

app.get('/api/v1/users/:user_id/workouts', (req, res) => {
  WorkoutsController.getUserWorkouts(req, res)
})

app.post('/api/v1/users', (req, res) => {
  UsersController.createNewUser(req, res)
})

app.get('/api/v1/users/:id', (req, res) => {
  const { id } = req.params
  database.raw(`SELECT users.id, users.name, email, roles.name AS role FROM users JOIN roles ON users.role_id = roles.id WHERE users.id = ?`, [id])
  .then( data => {
    if (data.rows.length < 1) {
      res.sendStatus(404)
    } else {
      res.json(data.rows)
    }
  })
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  database.raw(`SELECT id, password FROM users WHERE users.email = ?`, [email])
  .then( data => {
    const hash = data.rows[0].password
    const id = data.rows[0].id
    // console.log(password)
    // console.log(hash)
    bcrypt.compare(password, hash, (err, response) => {
      // console.log(response)
      // console.log(err)
      const token = randtoken.generate(64)
      if (response === true) {
        database.raw(`UPDATE users SET token = ? WHERE id = ? RETURNING id, name, email, token`, [token, id])
        .then( userInfo => {
          res.status(200).json(userInfo.rows[0])
        })
      } else {
        res.sendStatus(404)
      }
    })

  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
