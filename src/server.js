const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const mainRoutes = require('../routes/main')
const userRoutes = require('../routes/user')
const ejs = require('ejs')
const ejs_mate = require('ejs-mate')
const ejs_layouts = require('express-ejs-layouts')
require('dotenv').config({})

const app = express()

mongoose.connect(
  process.env.MONGO_URI,
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

// Static files
app.use(express.static(__dirname + '/../public'))

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// View engine
app.engine('ejs', ejs_mate)
app.set('view engine', 'ejs')
app.set('layout', '../views/layouts/default')
app.use(ejs_layouts)

// Routes
app.use(mainRoutes)
app.use(userRoutes)

app.listen(process.env.SERVER_PORT, err => {
  if (err) throw err
  console.log(`Server is running on port ${process.env.SERVER_PORT}.`)
})
