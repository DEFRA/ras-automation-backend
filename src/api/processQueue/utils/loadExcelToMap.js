import ExcelJS from 'exceljs'
import { read, write } from 'xlsx'

export const loadExcelToMap = async (
  filePath,
  keyColumnName,
  valueColumnname,
  workSheetName,
  rowNumber = 1
) => {
  const workbook = new ExcelJS.Workbook()

  const buffer = Buffer.from(filePath)

  const workbookXLSX = read(buffer, { type: 'buffer' })

  const xlsxBuffer = write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' })

  await workbook.xlsx.load(xlsxBuffer)

  const worksheet = workbook.getWorksheet(workSheetName)

  // Extract column names from header Row
  const headerRow = worksheet.getRow(rowNumber)
  const columnMap = {}

  headerRow.eachCell((cell, colNumber) => {
    columnMap[cell.value] = colNumber
  })

  if (!columnMap[keyColumnName] || !columnMap[valueColumnname]) {
    throw new Error(`Invalid column names`)
  }

  const keyColumnIndex = columnMap[keyColumnName]
  const valueColumnIndex = columnMap[valueColumnname]

  const dataMap = new Map()
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const key = row.getCell(keyColumnIndex).value
      const value = row.getCell(valueColumnIndex).value

      if (key) {
        dataMap.set(key, value)
      }
    }
  })

  return dataMap
}
