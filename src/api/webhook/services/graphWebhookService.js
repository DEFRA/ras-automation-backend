import { getAccessToken } from '~/src/api/processQueue/services/msalService.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { proxyFetch } from '~/src/helpers/proxy-fetch.js'
import fs from 'fs'

const logger = createLogger()
const subscriptionUrl = 'https://graph.microsoft.com/v1.0/subscriptions'
const expirationDateTime = new Date()
expirationDateTime.setDate(expirationDateTime.getDate() + 30)

export const createSubscription = async () => {
  const accessToken = await getAccessToken()
  const siteId = config.get('sharePointSiteId')
  const driveId = config.get('sharePointDriveId')
  const clientStateTest = config.get('clientState')

  const subscriptionBody = {
    changeType: 'updated',
    notificationUrl: 'https://54d7-77-101-21-114.ngrok-free.app/api/webhook',
    resource: `/sites/${siteId}/drives/${driveId}/root`,
    expirationDateTime: expirationDateTime.toISOString(),
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
    const data = await response.json()
    // Store subscription details
    fs.writeFileSync(
      'subscription.json',
      JSON.stringify(
        {
          id: data.id,
          expirationDateTime: data.expirationDateTime
        },
        null,
        2
      )
    )
    scheduleRenewal(data.id, data.expirationDateTime)
  } catch (error) {
    logger.error('Erorr creating subscription:', error)
    throw error
  }
}

const scheduleRenewal = (Id, expirationDateTime) => {
  const expirationTime = new Date(expirationDateTime).getTime()
  const now = Date.now()
  const timeUntilRenewal = expirationTime - now - 3 * 24 * 60 * 60 * 1000

  if (timeUntilRenewal > 0) {
    logger.info(
      `Subscription ${Id} will be renewed in ${(timeUntilRenewal / 1000 / 60 / 60).toFixed(2)} hours`
    )
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(() => renewWebhookSubscription(Id), timeUntilRenewal)
  } else {
    logger.info(
      `Subscription ${Id} has already expired or needs immediate renewal.`
    )
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    renewWebhookSubscription(Id)
  }
}

export const renewWebhookSubscription = async (subscriptionId) => {
  const accessToken = await getAccessToken()
  const subscriptionRenewalUrl = `${subscriptionUrl}/${subscriptionId}`
  const payload = {
    expirationDateTime: expirationDateTime.toISOString()
  }
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }
  try {
    const response = await proxyFetch(subscriptionRenewalUrl, options)
    const data = await response.json()
    logger.info(`Subscription  Renewed:`, response.data)
    // Update Stored subscription details
    fs.writeFileSync(
      'subscription.json',
      JSON.stringify(
        {
          id: data.id,
          expirationDateTime: data.expirationDateTime
        },
        null,
        2
      )
    )

    // Reschedule next renewal
    scheduleRenewal(data.id, data.expirationDateTime)
  } catch (error) {
    logger.error(`Error renewing subscription:`, error)
  }
}
