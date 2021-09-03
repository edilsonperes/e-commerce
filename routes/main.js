const router = require('express').Router()

router.get('/test', (req, res) => {
  return res.render('testpage', {
    layout: './layouts/test',
    title: 'Test page'
  })
})

router.get('/', (req, res) => {
  return res.render('main/home', {
    title: 'Home Page'
  })
})

router.get('/about', (req, res) => {
  return res.render('main/about', {
    title: 'About Page'
  })
})

module.exports = router
