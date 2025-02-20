import ExcelJS from 'exceljs'
import {
  IMISHeaderConfig,
  headerNotes,
  headersFirstTab,
  rowColors
} from '~/src/api/processQueue/config/imisheader.js'
import { loadColumnNamesByName } from '~/src/api/processQueue/utils/loadColumnValuesByName.js'
import { getMappingDataForExcel } from '~/src/api/processQueue/utils/mappingData.js'
import { applyValidationBasedOnHeaderColor } from '~/src/api/processQueue/utils/validations.js'
import { uploadFileToSharePoint } from '~/src/api/processQueue/services/sharepointService.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import fs from 'fs'

const logger = createLogger()

export const transformExcelData = async (response) => {
  logger.info(
    'Inputs received from controller to process the template creation'
  )
  const workbook = new ExcelJS.Workbook()
  const worksheet1 = workbook.addWorksheet('Notes')
  const worksheet = workbook.addWorksheet('Inspections')

  // Fill data and apply colors
  // eslint-disable-next-line array-callback-return
  rowColors.map((row, index) => {
    const eachRow = worksheet1.getRow(index + 2)
    eachRow.getCell(1).value = `${row.value}`
    eachRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: `${row.color}` }
    }
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

  const targetProjectIds = await loadColumnNamesByName(
    'Selection_Working_Doc.xlsx',
    'Selected',
    'Project Ref',
    'Combine Removed Duplicates'
  )

  const data = await getMappingDataForExcel(
    response,
    'Project Ref',
    targetProjectIds
  )

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

    if (col.note) cell.note = col?.note
  })

  // Enable filters on all columns
  worksheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: headers.length }
  }

  // Apply validation based on header color
  applyValidationBasedOnHeaderColor(worksheet, headers)

  const buffer = await workbook.xlsx.writeBuffer()

  logger.info('Buffer is ready  to process the template creation')

  // Save the Excel file locally to test
  fs.writeFileSync('IMIS-TEMPLATE.xlsx', buffer)

  // Upload transformed content back to sharepoint
  await uploadFileToSharePoint('/IMIS Template/IMIS-TEMPLATE.xlsx', buffer)
}
