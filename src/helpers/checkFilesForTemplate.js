import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { transformExcelData } from '~/src/api/processQueue/services/transformService.js'
import { sendEmails } from '~/src/api/processQueue/services/emailService.js'
import {
  getSharePointFiles,
  fetchFileContent
} from '~/src/api/processQueue/services/sharepointService.js'

const logger = createLogger()

export const checkFilesForTemplate = async () => {
  try {
    const files = await getSharePointFiles()

    // Download content of all files
    const filesData = await Promise.all(
      files.map(async (file) => {
        const content = await fetchFileContent(file)
        return {
          ...file,
          content
        }
      })
    )
    logger.info('filesData: ', filesData)
    await transformExcelData(filesData)
    await sendEmails()
  } catch (error) {
    logger.error('Error Checking for updates:', error)
  }
}
