import axios from 'axios'
import { getAccessToken } from '~/src/api/processQueue/services/msalService.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'

const logger = createLogger()

const createSubscription = async () => {
  const accessToken = await getAccessToken()
  const subscriptionUrl = 'https://graph.microsoft.com/v1.0/subscriptions'
  const siteId = config.get('sharePointSiteId')
  const driveId = config.get('sharePointDriveId')

  const body = {
    changeType: 'updated',
    notificationUrl: 'https://f6e9-77-101-21-114.ngrok-free.app/api/webhook',
    resource: `/sites/${siteId}/drive/${driveId}/root`,
    expirationDateTime: '2025-02-20T18:23:45.9356913Z',
    clientState: 'secretClientValue',
    latestSupportedTlsVersion: 'v1_2',
    eventTypes: ['ItemUpdated']
  }

  try {
    const response = await axios.post(subscriptionUrl, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    logger.error('Erorr creating subscription:', error)
    throw error
  }
}

export default createSubscription
