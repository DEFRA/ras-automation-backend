import { transformExcelData } from '~/src/api/processQueue/services/transformService.js'
import { sendEmails } from '~/src/api/processQueue/services/emailService.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { queueInitialInfo } from '~/src/api/common/helpers/start-server.js'
import { getSqsMessages } from '~/src/api/processQueue/services/sqsService.js'

export const processSqsMessages = {
  handler: async (_request, h) => {
    await getSqsMessages()
    await transformExcelData(queueInitialInfo)

    // Send Email to notify Users
    await sendEmails()
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}
