import { webHookController } from '~/src/api/webhook/controllers/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const webHook = {
  plugin: {
    name: 'webHook',
    register: (server) => {
      server.route([
        {
          method: 'POST',
          path: '/api/webhook',
          ...webHookController
        }
      ])
    }
  }
}

export { webHook }
