export const applyValidationBasedOnHeaderColor = (worksheet) => {
  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1) {
      row.eachCell((cell, colIndex) => {
        const cellColor = cell.fill.fgColor.argb
        worksheet.getColumn(colIndex).eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            if (cellColor === '0000FF') {
              cell.dataValidation = {
                type: 'textLength',
                operator: 'lessThanOrEqual',
                formula1: '50',
                showErrorMessage: true,
                errorTitle: 'Text too long',
                error: 'Maximum length is 50 characters.'
              }
            } else if (cellColor === 'FFFF00') {
              cell.dataValidation = {
                type: 'date',
                operator: 'between',
                formula1: '2023-01-01',
                formula2: '2025-12-31',
                showErrorMessage: true,
                errorTitle: 'Invalid Date',
                error: 'Date must be between 2023-01-01 and 2025-12-31'
              }
            } else if (cellColor === 'FFFF00') {
              cell.dataValidation = {
                type: 'date',
                operator: 'between',
                formula1: '2023-01-01',
                formula2: '2025-12-31',
                showErrorMessage: true,
                errorTitle: 'Invalid Date',
                error: 'Date must be between 2023-01-01 and 2025-12-31'
              }
            } else if (cellColor === 'FFA500') {
              cell.dataValidation = {
                type: 'list',
                allowBlank: false,
                formula1: 'Y,N',
                showErrorMessage: true,
                errorTitle: 'Invalid Input',
                error: 'Only "Y" or "N" is allowed.'
              }
            } else if (cellColor === '40E0D0') {
              cell.dataValidation = {
                type: 'whole',
                operator: 'greaterThanOrEqual',
                formula1: '0',
                showErrorMessage: true,
                errorTitle: 'Invalid Input',
                error:
                  'Only numeric values are allowed (no text or special characters)'
              }
            }
          }
        })
      })
    }
  })
}
