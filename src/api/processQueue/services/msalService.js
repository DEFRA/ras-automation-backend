import { msalClient } from '~/src/api/processQueue/config/msal.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'

export const getAccessToken = async () => {
  const logger = createLogger()
  const tokenRequest = {
    scopes: ['https://graph.microsoft.com/.default']
  }

  try {
    const { accessToken } =
      await msalClient.acquireTokenByClientCredential(tokenRequest)
    return accessToken
  } catch (error) {
    logger.error('Error fetching access token', error)
    throw error
  }
}
