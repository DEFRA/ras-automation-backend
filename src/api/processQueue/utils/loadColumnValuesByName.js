import ExcelJS from 'exceljs'
import { read, write } from 'xlsx'

export const loadColumnNamesByName = async (
  sourceFile = '',
  keyColumnName = '',
  valueColumnName = '',
  workSheetName = '',
  rowNumber = 1
) => {
  const workbook = new ExcelJS.Workbook()

  const buffer = Buffer.from(
    sourceFile.find(
      (file) => file.fileName === 'FETF_FTF_Selection_Working_Doc.xlsx'
    ).data
  )

  const workbookXLSX = read(buffer, { type: 'buffer' })

  const xlsxBuffer = write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' })

  await workbook.xlsx.load(xlsxBuffer)

  const worksheet = workbook.getWorksheet(workSheetName)

  const lookupValue = 'Y'

  const result = []

  const headerRow = worksheet.getRow(rowNumber)

  const idColumnIndex = headerRow.values.indexOf(keyColumnName)

  const nameColumnIndex = headerRow.values.indexOf(valueColumnName)

  worksheet.eachRow((row, rowIndex) => {
    const idValue = row.getCell(idColumnIndex).value
    if (rowIndex > rowNumber) {
      if (idValue === lookupValue) {
        const nameValue = row.getCell(nameColumnIndex).value
        result.push(nameValue)
      }
    }
  })

  return result
}
