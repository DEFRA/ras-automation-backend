import { consumeMessages } from '~/src/api/processQueue/services/sqsService.js'
import {
  fetchFileContent,
  uploadFileToSharePoint
} from '~/src/api/processQueue/services/sharepointService.js'
import { transformExcelData } from '~/src/api/processQueue/services/transformService.js'
import { sendEmails } from '~/src/api/processQueue/services/emailService.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

export const processSqsMessages = {
  handler: async (_request, h) => {
    const logger = createLogger()
    const messages = consumeMessages()

    for (const message of messages) {
      const { filePath, fileName } = JSON.parse(message.Body)

      try {
        // Fetch file content from SharePoint
        const fileContent = await fetchFileContent(filePath)

        // Transform and validate the file content
        const transformedContent = await transformExcelData(fileContent)

        // Generate a new file Name
        const newFileName = `Transformed-${fileName}`
        const newFilePath = `${filePath.substring(0, filePath.lastIndexOf('/'))}/${newFileName}`

        // Upload transformed content back to sharepoint
        await uploadFileToSharePoint(newFilePath, transformedContent)

        // Email service
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        sendEmails()
      } catch (error) {
        logger.error('Error processing message:', error.message)
      }
    }
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}
