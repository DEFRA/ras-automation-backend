import { processSqsMessages } from '../processQueue/controllers/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const processQueue = {
  plugin: {
    name: 'processQueue',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/api/processQueue',
          ...processSqsMessages
        }
      ])
    }
  }
}

export { processQueue }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
