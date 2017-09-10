const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Workout Tracker API'

app.get('/api/v1/lifts', (req, res) => {
  database.raw('SELECT id, name FROM lifts')
  .then( data => {
    return res.json(data.rows)
  })
})

app.get('/api/v1/lifts/:id', (req, res) => {
  const { id } = req.params
  database.raw(`SELECT id, name FROM lifts WHERE id = ?`, [id])
  .then( data => {
    if (data.rows.length < 1) {
      res.sendStatus(404)
    } else {
      return res.json(data.rows)
    }
  })
})

app.post('/api/v1/lifts', (req, res) => {
  const lift = req.body.lift
  const name = lift.name

  if (name === "") {
    res.sendStatus(400)
  } else {
    database.raw('INSERT INTO lifts (name, created_at) VALUES (?, ?) RETURNING id, name', [name, new Date])
    .then( data => {
      return res.json(data.rows)
    })
  }

})

app.put('/api/v1/lifts/:id', (req, res) => {
  const { id } = req.params
  const lift = req.body.lift
  const name = lift.name

  if (name === "") {
    res.sendStatus(400)
  } else {
    database.raw('UPDATE lifts SET name = ? WHERE id = ? RETURNING id, name', [name, id])
    .then( data => {
      if (data.rows.length < 1) {
          res.sendStatus(404)
      } else {
        return res.json(data.rows)
      }
    })
  }
})

app.delete('/api/v1/lifts/:id', (req, res) => {
  const { id } = req.params
  database.raw('DELETE FROM lifts WHERE id = ?', [id])
  .then(data => {
    if (data.rowCount < 1) {
      res.sendStatus(404)
    } else {
      res.sendStatus(200)
    }
  })
})

app.get('/api/v1/bodyareas', (req, res) => {
  database.raw('SELECT id, name FROM bodyareas')
  .then( data => {
    return res.json(data.rows)
  })
})

app.get('/api/v1/bodyareas/:id', (req, res) => {
  const { id } = req.params
  database.raw('SELECT id, name FROM bodyareas WHERE id = ?', [id])
  .then(data => {
    return res.json(data.rows)
  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
