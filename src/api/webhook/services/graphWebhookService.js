import { getAccessToken } from '~/src/api/processQueue/services/msalService.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { proxyFetch } from '~/src/helpers/proxy-fetch.js'

const logger = createLogger()

export const createSubscription = async () => {
  const accessToken = await getAccessToken()
  const subscriptionUrl = 'https://graph.microsoft.com/v1.0/subscriptions'
  const siteId = config.get('sharePointSiteId')
  const driveId = config.get('sharePointDriveId')
  const clientStateTest = config.get('clientState')

  const subscriptionBody = {
    changeType: 'updated',
    notificationUrl: 'https://90a0-77-101-21-114.ngrok-free.app/api/webhook',
    resource: `/sites/${siteId}/drives/${driveId}/root`,
    expirationDateTime: '2025-03-24T18:23:45.9356913Z',
    clientState: clientStateTest,
    eventTypes: ['ItemUpdated', 'ItemCreated']
  }

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscriptionBody)
  }

  try {
    const response = await proxyFetch(subscriptionUrl, options)
    const { id } = await response.json()
    return id
  } catch (error) {
    logger.error('Erorr creating subscription:', error)
    throw error
  }
}
