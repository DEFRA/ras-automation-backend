import ExcelJS from 'exceljs'
import fs from 'fs'

export const getColumnValues = async (excelFile, columnNumber) => {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(excelFile)
  const sheet = workbook.worksheets[0]

  const valuesArray = []
  sheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1) return
    const cellValue = row.getCell(columnNumber).value
    if (cellValue !== null && cellValue !== undefined) {
      valuesArray.push(cellValue)
    }
  })

  return valuesArray
}

export const cleanNumberField = (value) => {
  if (value) return parseFloat(value.replace(/[^0-9.]/g, ''))
}

export const saveToLocalFile = (response) => {
  fs.writeFileSync('output.xlsb', Buffer.from(response.data))
}
