import ExcelJS from 'exceljs'
import { read, write } from 'xlsx'

export const loadExcelToMap = async (
  filePath = '',
  keyColumnName = '',
  valueColumnNames = [],
  workSheetName = '',
  rowNumber = 1
) => {
  const workbook = new ExcelJS.Workbook()

  const buffer = Buffer.from(filePath)

  const workbookXLSX = read(buffer, { type: 'buffer' })

  const xlsxBuffer = write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' })

  await workbook.xlsx.load(xlsxBuffer)

  const worksheet = workbook.getWorksheet(workSheetName)

  // Extract column names from header Row
  const headerRow = rowNumber && worksheet.getRow(rowNumber)
  const columnMap = {}

  headerRow.eachCell((cell, colNumber) => {
    columnMap[cell.value] = colNumber
  })

  if (
    !columnMap[keyColumnName] ||
    valueColumnNames.some((name) => !columnMap[name])
  ) {
    throw new Error(`Invalid column names`)
  }

  const dataMap = new Map()

  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex > rowNumber) {
      const key = row.getCell(columnMap[keyColumnName]).value
      if (key) {
        const values = {}
        valueColumnNames.forEach((name) => {
          values[name] = row.getCell(columnMap[name]).value
        })
        dataMap.set(key, values)
      }
    }
  })

  return dataMap
}
