const tokenValidate = require('../controllers/token.validate')

const router = require('express').Router()

const {createUser, loginUser, verifyUser} = require('../controllers/users')

router.post('/add-user', createUser)

router.post('/login', loginUser)

router.post('/verify-user', tokenValidate, verifyUser)

module.exports = router