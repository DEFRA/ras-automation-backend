import { fetchFileContent } from '~/src/api/processQueue/services/sharepointService.js'
import { transformExcelData } from '~/src/api/processQueue/services/transformService.js'
import { sendEmails } from '~/src/api/processQueue/services/emailService.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

export const processSqsMessages = {
  handler: async (_request, h) => {
    const logger = createLogger()
    const JSONArray = []

    const messages = [
      {
        fileName: 'SBI_FRN_CPH.xlsb',
        filePath: '/Selection/FETF/SBI_FRN_CPH.xlsb'
      },
      {
        fileName: 'CPH_SEO_Group_Look_Up_Table_V4_23.01.2025',
        filePath:
          '/Selection/FETF/CPH_SEO_Group_Look_Up_Table_V4_23.01.2025.xlsx',
        sheetName: ''
      },
      {
        fileName: 'giles_report_official_sensitive_1.xlsb',
        filePath: '/Selection/FETF/giles_report_official_sensitive_1.xlsb',
        sheetName: 'giles_report_official_sensitive'
      },
      {
        fileName: 'giles_report_official_sensitive_2b.xlsb',
        filePath: '/Selection/FETF/giles_report_official_sensitive_2b.xls.xlsb',
        sheetName: 'giles_report_official_sensitive'
      },
      {
        fileName: 'CS_MEASURES.xlsb',
        filePath: '/Selection/FETF/CS_MEASURES.xlsb',
        sheetName: 'CS_MEASURES'
      }
    ]

    for (const message of messages) {
      const { filePath } = message

      try {
        // Fetch file content from SharePoint
        const fileContent = await fetchFileContent(filePath)
        JSONArray.push(fileContent)
      } catch (error) {
        logger.error('Error processing message:', error.message)
      }
    }

    await transformExcelData(JSONArray)

    // Upload transformed content back to sharepoint
    // await uploadFileToSharePoint(newFilePath, transformedContent)

    // Send Email to notify Users
    await sendEmails()
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}
