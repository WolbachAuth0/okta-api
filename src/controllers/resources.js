const axios = require('axios')
const { logger } = require('express-winston')
const responseFormatter = require('./../middleware/responseFormatter')
const items = require('./data')

module.exports = {
  listAll,
  listAllLocal,
  getByID,
  getByIDLocal
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
      message: `found ${response.data.length} items from remote store`,
      data: response.data
    }
    const json = responseFormatter(req, res, options)
    res.status(options.status).json(json)
  } catch (error) {
    return handleError(error)
  }
}

async function listAllLocal (req, res) {
  try {
    const options = {
      status: 200,
      message: `found ${items.length} items from local store`,
      data: items
    }
    const json = responseFormatter(req, res, options)
    res.status(options.status).json(json)
  } catch (error) {
    return handleError(error)
  }
}

async function getByID (req, res) {
  try {
    const id = req.params.resource_id

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

async function getByIDLocal (req, res) {
  try {
    const id = req.params.resource_id
    
    const item = items.find(x => x.id == id)
    
    const options = {
      status: item ? 200: 404,
      message: item ? `found item with id: ${id} in local store` : `item with id: ${id} not found in local store`,
      data: item ? item : {}
    }
    const json = responseFormatter(req, res, options)
    res.status(options.status).json(json)
  } catch (error) {
    return handleError(error)
  }
}
