import { config } from '~/src/config/index.js'

export const apiKeyMiddleWare = (request, h) => {
  const payload = request.payload

  if (!payload?.value[0]?.clientState) {
    return h.response({ error: 'Missing ClientState' }).code(400).takeover()
  }

  const receivedClientState = payload.value[0].clientState
  const expectedClientState = config.get('clientState')

  if (receivedClientState !== expectedClientState) {
    return h.response({ error: 'Unauthorized' }).code(401).takeover()
  }

  // Add API key to request headers before passing to the controller
  request.headers['x-api-key'] = process.env.API_KEY ?? 'test12345'

  return h.continue
}
