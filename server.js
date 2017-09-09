var express = require('express')
var app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Workout Tracker API'

app.get('/lifts', (req, res) => {
  response.send('It\'s a secret to everyone.')
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
