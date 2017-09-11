const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class BodyareasController {
 static getAllBodyareas(res) {
   database.raw(`SELECT id, name FROM bodyareas`)
   .then( data => {
     return res.json(data.rows)
   })
 }
}

module.exports = BodyareasController
