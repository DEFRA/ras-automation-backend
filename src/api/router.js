import { health } from '~/src/api/health/index.js'
import { processQueue } from '~/src/api/processQueue/index.js'
import { webHook } from './webhook/index.js'

/**
 * @satisfies { import('@hapi/hapi').ServerRegisterPluginObject<*> }
 */
const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here.
      await server.register([processQueue])
      await server.register([webHook])
    }
  }
}

export { router }
