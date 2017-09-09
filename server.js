const express = require('express')
const app = express()

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Workout Tracker API'

app.get('/api/v1/lifts', (req, res) => {
  database.raw('SELECT id, name, bodyarea FROM lifts')
  .then( data => {
    return res.json(data.rows)
  })
})

app.get('/api/v1/lifts/:id', (req, res) => {
  const { id } = req.params
  database.raw(`SELECT id, name, bodyarea FROM lifts WHERE id = ?`, [id])
  .then( data => {
    if (data.rows.length < 1) {
      res.sendStatus(404)
    } else {
      return res.json(data.rows)
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
