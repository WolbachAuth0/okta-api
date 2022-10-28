const router = require('express').Router()
const { validateAccessToken } = require('../middleware/auth')
const resources = require('./../controllers/resources')

module.exports = router

// Organizations
router.route('/')
  // .all(validateAccessToken)
  .get(resources.listAll)

router.route('/:resource_id')
  .all(validateAccessToken)
  .get(
    // checkJWTScopes(['read:organizations'], options),
    resources.getByID
  )

