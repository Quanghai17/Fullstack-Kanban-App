const router = require('express').Router()
const { param } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const boardController = require('../controllers/boardController')

router.post(
    '/',
    tokenHandler.verifyToken,
    boardController.create
)

router.get(
    '/',
    tokenHandler.verifyToken,
    boardController.getAll
)

router.put(
    '/',
    tokenHandler.verifyToken,
    boardController.updatePosition
)

module.exports = router