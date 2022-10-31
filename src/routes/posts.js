const router = require('express').Router()
const { validateAccessToken, assertJWTScopes } = require('../middleware/auth')
const posts = require('../controllers/posts')

module.exports = router

// Organizations
router.route('/')
  .all(validateAccessToken)
  .get(
    assertJWTScopes(['update:posts']),
    posts.listAll
  )

router.route('/:post_id')
  .all(validateAccessToken)
  .get(
    assertJWTScopes(['read:posts']),
    posts.getByID
  )

