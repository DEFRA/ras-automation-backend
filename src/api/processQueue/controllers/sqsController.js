import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { sendEmails } from '~/src/api/processQueue/services/emailService.js'

const logger = createLogger()

export const processSqsMessages = {
  handler: async (_request, h) => {
    logger.info('Transformed file is processed')

    // Send Email to notify Users
    await sendEmails()
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}
