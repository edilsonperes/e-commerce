const router = require('express').Router()
const User = require('../models/user')

router.get('/signup', (req, res) => {
  return res.render('user/signup', {
    title: 'Signup'
  })
})

router.post('/signup', async (req, res) => {
  let existingUser
  try {
    existingUser = await User.findOne({
      email: { $regex: new RegExp(req.body.email, 'i') }
    })
  } catch (err) {
    throw err
  }

  if (existingUser) {
    console.log('This email address is already in use, please login.')
    return (
      // res.json('This email address is already in use, please login.'),
      res.redirect('/login')
    )
  } else {
    let user = new User()

    user.profile.name = req.body.name
    user.password = req.body.password
    user.email = req.body.email

    try {
      await user.save()
      return res.json('Successfully created a new user.')
    } catch (err) {
      throw err
    }
  }
})

router.get('/login', async (req, res) => {
  return res.render('user/login', {
    title: 'Login'
  })
})

module.exports = router
