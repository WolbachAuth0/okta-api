const server = require('./src/server')
const { logger } = require('./src/models/logger')

const port = process.env.NODE_ENV === 'development' ? 8081 : process.env.PORT || 8080
server.listen(port, () => {
  logger.info(`starting application in ${process.env.NODE_ENV} mode.`)
  logger.info(`app is listening on port: ${port}`)
})
