import fs from 'fs'
import { createLogger } from '../../../api/common/helpers/logging/logger.js'
import {
  renewWebhookSubscription,
  createSubscription
} from '../../webhook/services/graphWebhookService.js'

const logger = createLogger()
export const initializeSubscription = async () => {
  if (fs.existsSync('subscription.json')) {
    const subscription = JSON.parse(
      fs.readFileSync('subscription.json', 'utf-8')
    )
    await renewWebhookSubscription(
      subscription.id,
      subscription.expirationDateTime
    )
  } else {
    logger.info('No exisiting subscription found. Creating a new one')
    await createSubscription()
  }
}
