const router = require('express').Router()
const userController = require('../controllers/userController')
const tokenHandler = require('../handlers/tokenHandler')
const validation = require('../handlers/validation')

router.post ("/signup",validation.validate, userController.register)
router.post ("/login",validation.validate, userController.login)

router.post(
    '/verify-token',
    tokenHandler.verifyToken,
    (req, res) => {
      res.status(200).json({ user: req.user })
    }
  )

module.exports = router