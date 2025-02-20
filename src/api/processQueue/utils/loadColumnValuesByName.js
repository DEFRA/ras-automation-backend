import ExcelJS from 'exceljs'

export const loadColumnNamesByName = async (
  filePath = '',
  keyColumnName = '',
  valueColumnName = '',
  workSheetName = '',
  rowNumber = 1
) => {
  const workbook = new ExcelJS.Workbook()

  await workbook.xlsx.readFile(filePath)

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
