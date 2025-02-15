import { fetchFileContent } from '~/src/api/processQueue/services/sharepointService.js'
import { transformExcelData } from '~/src/api/processQueue/services/transformService.js'
import { sendEmails } from '~/src/api/processQueue/services/emailService.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

export const processSqsMessages = {
  handler: async (_request, h) => {
    const logger = createLogger()

    const JSONArray = [
      {
        fileName: 'SBI_FRN_CPH.xlsx'
      },
      {
        fileName: 'CPH_SEO_Group_Look_Up_Table_V4_23.01.2025.xlsx'
      },
      {
        fileName: 'giles_report_official_sensitive_1.xlsb'
      },
      {
        fileName: 'giles_report_official_sensitive_2b.xlsb'
      },
      {
        fileName: 'CS_MEASURES.xlsb'
      }
    ]

    const messages = [
      {
        fileName: 'SBI_FRN_CPH.xlsx',
        filePath: '/Selection/FETF/SBI_FRN_CPH.xlsx'
      },
      {
        fileName: 'CPH_SEO_Group_Look_Up_Table_V4_23.01.2025.xlsx',
        filePath:
          '/Selection/FETF/CPH_SEO_Group_Look_Up_Table_V4_23.01.2025.xlsx'
      },
      {
        fileName: 'giles_report_official_sensitive_1.xlsb',
        filePath: '/Selection/FETF/giles_report_official_sensitive_1.xlsb'
      },
      {
        fileName: 'giles_report_official_sensitive_2b.xlsb',
        filePath: '/Selection/FETF/giles_report_official_sensitive_2b.xls.xlsb'
      },
      {
        fileName: 'CS_MEASURES.xlsb',
        filePath: '/Selection/FETF/CS_MEASURES.xlsb'
      }
    ]

    for (const message of messages) {
      const { filePath, fileName } = message

      try {
        // Fetch file content from SharePoint
        const fileContent = await fetchFileContent(filePath)
        const match = JSONArray.find((file) => file.fileName === fileName)
        match.data = fileContent
      } catch (error) {
        logger.error('Error processing message:', error.message)
      }
    }
    await transformExcelData(JSONArray)

    // Send Email to notify Users
    await sendEmails()
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}
