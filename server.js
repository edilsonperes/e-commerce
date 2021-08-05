const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const User = require('./models/user')
const ejs = require('ejs')
const engine = require('ejs-mate')
const db_uri = require('./MongoDB.json')

const app = express()
const port = 3000

mongoose.connect(
  db_uri.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to the database.')
    }
  }
)

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('ejs', engine)
app.set('view engine', 'ejs')

app.get('/test', (req, res) => {
  res.send('Working')
})

app.post('/create-user', (req, res, next) => {
  let user = new User()

  user.profile.name = req.body.name /* same as defined in insomnia */
  user.password = req.body.password
  user.email = req.body.email

  user.save(err => {
    if (err) return next(err)
    res.json('Successfully created a new user.')
  })
})

app.get('/', (req, res) => {
  res.render('main/home')
})

app.get('/about', (req, res) => {
  res.render('main/about')
})

app.listen(port, err => {
  if (err) throw err
  console.log(`Server is running on port ${port}`)
})
