const router = require('express').Router()
const responseFormatter = require('../middleware/responseFormatter')

module.exports = router

router
  .route('/')
  .get((req, res) => {
    try {
      const status = 200
      const message = 'Hello from the API server !'
      data = [
        {
          endpoint: `/api/v1/posts`,
          description: 'list all post resources',
          requiresAuthentication: true      
        },
        {
          endpoint: `/api/v1/posts/:post_id`,
          description: 'get post resource by id',
          requiresAuthentication: true
        }
      ]
      const json = responseFormatter(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      const status = 500
      const message = error.message
      const data = error
      const json = responseFormatter(req, res, { status, message, data })
      res.status(status).json(json)
    }
  })