const router = require('express').Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('login', (req, res) => {})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('user already exist')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router