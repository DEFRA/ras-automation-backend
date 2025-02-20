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
  if (value) return value
}

export const saveToLocalFile = (response) => {
  fs.writeFileSync('output.xlsb', Buffer.from(response.data))
}

export const streamToBuffer = async (stream) => {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export const transformDataForSQS = (messages) => {
  messages.map(
    (msg) => `ID: ${msg.id}, FileName: ${msg.name}, FilePath: ${msg.filePath}`
  )
}

export const validateDateFormat = (cellValue) => {
  const dateRegex = /^\d{2}\/d{2}\/\d{4}$/
  if (!dateRegex.test(cellValue)) {
    return false
  }

  const [day, month, year] = cellValue.split('/')
  const date = new Date(`${year}-${month}-${day}`)
  return !isNaN(date.getTime())
}

export const styleToHighlight = () => {
  return {
    top: { style: 'thin', color: { argb: 'FFFF00' } },
    left: { style: 'thin', color: { argb: 'FFFF00' } },
    bottom: { style: 'thin', color: { argb: 'FFFF00' } },
    right: { style: 'thin', color: { argb: 'FFFF00' } }
  }
}
