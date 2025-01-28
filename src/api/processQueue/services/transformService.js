import { utils, read, write } from 'xlsx'
import { createLogger } from '../../common/helpers/logging/logger.js'

export const transformExcelData = (buffer) => {
  const logger = createLogger()
  try {
    const workbook = read(buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    // Convert Sheet to JSON
    const data = utils.sheet_to_json(sheet)

    // Transform and validate dataCLS
    const transformedData = data.map((item) => {
      return {
        ...item
      }
    })

    // Convert JSON back to sheet
    const newSheet = utils.json_to_sheet(transformedData)
    const newWorkbook = {
      Sheets: { [sheetName]: newSheet },
      SheetNames: [sheetName]
    }

    // Return workbook as buffer
    return write(newWorkbook, { type: 'buffer', bookType: 'xlsx' })
  } catch (error) {
    logger.error('Error transforming excel file:', error.message)
  }
}
