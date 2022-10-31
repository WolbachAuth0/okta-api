const axios = require('axios')
const responseFormatter = require('../middleware/responseFormatter')

// https://jsonplaceholder.typicode.com/

module.exports = {
  listAll,
  getByID,
}

function handleError(req, res, error) {
  console.log(error)
  const options = {
    status: 500,
    message: error.message,
    data: {}
  }
  const json = responseFormatter(req, res, options)
  res.status(options.status).json(json)
}

async function listAll (req, res) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    const options = {
      status: 200,
      message: `found ${response.data.length} posts from remote store`,
      data: response.data
    }
    const json = responseFormatter(req, res, options)
    res.status(options.status).json(json)
  } catch (error) {
    return handleError(error)
  }
}

async function getByID (req, res) {
  try {
    const id = req.params.post_id

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        
    const options = {
      status: response.data ? 200: 404,
      message: response.data ? `found item with id: ${id} in remote store` : `item with id: ${id} not found in remote store`,
      data: response.data
    }
    const json = responseFormatter(req, res, options)
    res.status(options.status).json(json)
  } catch (error) {
    return handleError(error)
  }
}
