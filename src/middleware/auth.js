const OktaJwtVerifier = require('@okta/jwt-verifier')
const responseFormatter = require('./responseFormatter')

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER
})
const audience = process.env.AUDIENCE

function unauthorized (msg) {
  return {
    status: 401,
    message: msg || 'UNAUTHORIZED', 
    data: {}
  }
}

async function validateAccessToken (req, res, next) {
  const authHeader = req.headers.authorization || ''
  const match = authHeader.match(/Bearer (.+)/)
  if (!match) {
    const options = unauthorized('No authorization header')
    const json = responseFormatter(req, res, options)
    return res.status(options.status).json(json)
  }

  try {
    const accessToken = match[1]
    if (!accessToken) {
      const options = unauthorized('No access token')
      const json = responseFormatter(req, res, options)
      return res.status(options.status).json(json)
    }
    req.jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience)
    next()
  } catch (err) {
    const options = unauthorized(err.message)
    const json = responseFormatter(req, res, options)
    return res.status(options.status).json(json)
  }
}

function assertJWTScopes (scopes) {
  
  return async function (req, res, next) {
    
    if (!req.jwt) {
      const options = unauthorized('No access token')
      const json = responseFormatter(req, res, options)
      return res.status(options.status).json(json)
    }

    console.log('scopes', scopes)
    console.log('scp', req.jwt.claims.scp)

    if (scopes.every(x => req.jwt.claims.scp.includes(x))) {
      next()
    } else {
      const options = unauthorized('insufficient scope')
      const json = responseFormatter(req, res, options)
      return res.status(options.status).json(json)
    }
  }
}

module.exports = {
  validateAccessToken,
  assertJWTScopes
}