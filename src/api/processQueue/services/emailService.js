import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { config } from '~/src/config/index.js'
import { NotifyClient } from 'notifications-node-client'

export const sendEmails = async () => {
  const TEMPLATE_ID = config.get('emailTemplateId')
  const API_KEY = config.get('emailAPIKey')
  const notifyClient = new NotifyClient(API_KEY)
  const logger = createLogger()

  // list of users to send emails to multiple users
  const users = [
    { email: 'eswardev.nekkanti@cognizant.com', name: 'eshwar dev' }
  ]

  for (const user of users) {
    // eslint-disable-next-line no-console
    console.log(
      'notifyClient',
      notifyClient.sendEmail,
      TEMPLATE_ID,
      user.email,
      user.name
    )
    try {
      const response = await notifyClient.sendEmail(TEMPLATE_ID, user.email, {
        personalisation: {
          name: user.name
        }
      })

      // eslint-disable-next-line no-console
      console.log(`Email sent successfully to : ${user.email}`, response)
    } catch (error) {
      logger.error(error)
    }
  }
}
