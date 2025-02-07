import ExcelJS from 'exceljs'
import {
  IMISHeaderConfig,
  headerNotes,
  headersFirstTab,
  rowColors
} from '~/src/api/processQueue/config/imisheader.js'
import { getMappingDataForExcel } from '~/src/api/processQueue/utils/mappingData.js'

export const transformExcelData = async (response) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet1 = workbook.addWorksheet('Notes')
  const worksheet = workbook.addWorksheet('Inspections')

  // Fill data and apply colors
  // eslint-disable-next-line array-callback-return
  rowColors.map((row, index) => {
    const eachRow = worksheet1.getRow(index + 2)
    eachRow.getCell(1).value = `${row.value}`
    eachRow.getCell(1).fgColor = `${row.color}`
  })

  worksheet1.columns = headersFirstTab.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width
  }))

  // Loop through each column in header row and add note
  worksheet.getRow(1).eachCell((cell) => {
    const headerText = cell.value
    if (headerNotes[headerText]) {
      cell.note = headerNotes[headerText]
    }
  })

  // Define column headers with color codes
  const headers = IMISHeaderConfig

  // Apply headers to the worksheet
  worksheet.columns = headers.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width
  }))

  const data = await getMappingDataForExcel(response, 'Project Ref')

  data.forEach((rowData) => {
    worksheet.addRow(rowData)
  })

  // Apply fonts to all cells
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.font = { name: 'Tahoma', size: 8 }
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'left'
      }
    })
  })

  // style the header row
  const headerRow = worksheet.getRow(1)
  headerRow.height = 56

  headerRow.eachCell((cell, colNumber) => {
    const col = headers[colNumber - 1]
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: col.color }
    }
    cell.font = {
      bold: false,
      color: { argb: '000000' },
      size: 8,
      name: 'Tahoma'
    }
    cell.alignment = {
      wrapText: true,
      vertical: 'top',
      horizontal: 'center'
    }
  })

  // Enable filters on all columns
  worksheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: headers.length }
  }

  const applyValidationsBasedonFirstRowColors = () => {
    for (let col = 1; col <= 3; col++) {
      const firstRowCell = worksheet.getCell(1, col)
      const color = firstRowCell.fill.fgColor.argb
      // Apply data validations  based on color of first row cell
      let validationFormula = ''
      let validationMessage = ''
      if (color === '0000FF') {
        validationFormula = 'AND(ISNUMBER(A2), A2>=1, A2<=5'
        validationMessage = 'Please enter a number between 1 and 5'
      }

      if (validationFormula) {
        worksheet.getColumn(col).eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            cell.dataValidation = {
              type: 'custom',
              formula1: validationFormula,
              showErrorMessage: true,
              errorTitle: 'Invalid Input',
              error: validationMessage
            }
          }
        })
      }
    }
  }

  applyValidationsBasedonFirstRowColors()

  // Save the Excel file
  await workbook.xlsx.writeFile('IMIS-TEMPLATE.xlsx')
}
