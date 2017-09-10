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
  database.raw(`SELECT id, name FROM lifts`)
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
    database.raw(`INSERT INTO lifts (name, created_at) VALUES (?, ?) RETURNING id, name`, [name, new Date])
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
    database.raw(`UPDATE lifts SET name = ? WHERE id = ? RETURNING id, name`, [name, id])
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
  database.raw(`DELETE FROM lifts WHERE id = ?`, [id])
  .then(data => {
    if (data.rowCount < 1) {
      res.sendStatus(404)
    } else {
      res.sendStatus(200)
    }
  })
})

app.get('/api/v1/bodyareas', (req, res) => {
  database.raw(`SELECT id, name FROM bodyareas`)
  .then( data => {
    return res.json(data.rows)
  })
})

app.get('/api/v1/bodyareas/:id', (req, res) => {
  const { id } = req.params
  database.raw(`SELECT id, name FROM bodyareas WHERE id = ?`, [id])
  .then(data => {
    if (data.rows.length < 1) {
      res.sendStatus(404)
    } else {
      return res.json(data.rows)
    }
  })
})

app.post('/api/v1/bodyareas', (req, res) => {
  const ba = req.body.bodyarea
  const name = ba.name

  if (name === "") {
    res.sendStatus(400)
  } else {
    database.raw(`INSERT INTO bodyareas (name, created_at) VALUES (?, ?) RETURNING id, name`, [name, new Date])
    .then( data => {
      return res.json(data.rows)
    })
  }
})

app.put('/api/v1/bodyareas/:id', (req, res) => {
  const { id } = req.params
  const ba = req.body.bodyarea
  const name = ba.name

  if (name === "") {
    res.sendStatus(400)
  } else {
    database.raw(`UPDATE bodyareas SET name = ? WHERE id = ? RETURNING id, name`, [name, id])
    .then(data => {
      if (data.rows.length < 1) {
        res.sendStatus(404)
      } else {
        return res.json(data.rows)
      }
    })
  }
})

app.delete('/api/v1/bodyareas/:id', (req, res) => {
  const { id } = req.params
  database.raw(`DELETE FROM bodyareas WHERE id = ?`, [id])
  .then(data => {
    if (data.rowCount < 1) {
      res.sendStatus(404)
    } else {
      res.sendStatus(200)
    }
  })
})

app.get('/api/v1/bodyarea_lifts_by_bodyarea/:id', (req, res) => {
  const { id } = req.params
  database.raw(`SELECT bodyareas.id AS bodyarea_id, bodyareas.name AS bodyarea_name, lifts.id AS lift_id, lifts.name AS lift_name
                FROM bodyareas
                JOIN bodyarea_lifts
                ON bodyareas.id = bodyarea_lifts.bodyarea_id
                JOIN lifts
                ON bodyarea_lifts.lift_id = lifts.id
                WHERE bodyareas.id = ?
                ORDER BY lifts.name;`, [id])
  .then(data => {
    if (data.rows < 1) {
      res.sendStatus(404)
    } else {
      const lifts = []
      data.rows.forEach( (lift) => {
        const liftId = lift.lift_id
        const liftName = lift.lift_name
        const liftObject = { id: liftId, name: liftName }
        lifts.push(liftObject)
      })
      const liftObject = { id: data.rows[0].bodyarea_id,  name: data.rows[0].bodyarea_name, lifts: lifts}
      return res.json(liftObject)
    }
  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
