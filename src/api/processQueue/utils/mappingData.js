import ExcelJS from 'exceljs'
import { loadExcelToMap } from '~/src/api/processQueue/utils/loadExcelToMap.js'
import { read, write } from 'xlsx'
import { cleanNumberField } from '../utils/index.js'

export const getMappingDataForExcel = async (
  sourceFile,
  columnName,
  targetProjectIds
) => {
  try {
    const workbook = new ExcelJS.Workbook()

    // use stream reader for large files
    //  const readStream = fs.readFileSync(sourceFile)

    const buffer = Buffer.from(
      sourceFile.find(
        (file) => file.fileName === 'giles_report_official_sensitive_2b.xlsb'
      ).data
    )

    const workbookXLSX = read(buffer, { type: 'buffer' })

    const xlsxBuffer = write(workbookXLSX, { bookType: 'xlsx', type: 'buffer' })

    await workbook.xlsx.load(xlsxBuffer)

    // Get first sheet from source workbook
    const worksheet = workbook.getWorksheet(1)

    // Get header row ( first row names)
    const headerRow = worksheet.getRow(4)

    // Find the column index  for the condition column and target column
    const columnIndex = headerRow.values.findIndex(
      (value) => value === columnName
    )

    // const getBusinessNameIndex = headerRow.values.findIndex(
    //   (value) => value === 'Business Name'
    // )

    const getSBIIndex = headerRow.values.findIndex(
      (value) => value === 'Single Business Identifier (SBI)'
    )

    const getAddressCore4 = headerRow.values.findIndex(
      (value) => value === 'County'
    )

    const mappedObject = []
    const obj = {
      limtCore: null,
      CPHCore: null,
      SBICore: null,
      FRNCore: null,
      schemeCore: 'FETF',
      schemeYearCore: 2024,
      selectionMethodCore: 'random',
      customerNameCore: null,
      phoneNoCore: null,
      mobileCore: null,
      claimValueDossier: null,
      agreementRefCore: null,
      highValueCore: null,
      SPSClaimantCore: 'Y',
      NoOfAgreementsRDP: 1,
      totalFieldsRDP: 0,
      lifetimeValueRDP: null,
      addressCore1: null,
      addressCore2: null,
      addressCore3: null,
      addressCore4: null,
      postCodeCore: null,
      selectionBasisRDP: null,
      preInspectionDate: null
    }

    // const CPH_CODE = await loadExcelToMap(
    //   sourceFile.find((file) => file.fileName === 'SBI_FRN_CPH.xlsx').data,
    //   'SBI',
    //   ['CPH_CODE'],
    //   'FRN_CPH_SBI'
    // )

    const LMT_CORE = await loadExcelToMap(
      sourceFile.find(
        (file) =>
          file.fileName === 'CPH_SEO_Group_Look_Up_Table_V4_23.01.2025.xlsx'
      ).data,
      'Enter CPH data in this column',
      ['SEO Group'],
      'CPH to SEO group Match'
    )

    const SEO_GROUP = await loadExcelToMap(
      sourceFile.find(
        (file) =>
          file.fileName === 'CPH_SEO_Group_Look_Up_Table_V4_23.01.2025.xlsx'
      ).data,
      'County',
      ['SEOGroup'],
      'CPH to SEO group Match'
    )

    const SEO_GROUP_SHORE_SPLIT = await loadExcelToMap(
      sourceFile.find(
        (file) =>
          file.fileName === 'CPH_SEO_Group_Look_Up_Table_V4_23.01.2025.xlsx'
      ).data,
      'County & Parish Number',
      ['AREA'],
      '35 Shropshire Split'
    )

    const LMT_CORE_CONVERSION = (value = '', CPHValue = '', county) => {
      if (CPHValue === null || CPHValue === '') {
        const result = SEO_GROUP?.get(county)?.SEOGroup || null
        return result
      }
      if (CPHValue.split('/')[0] === '35') {
        return SEO_GROUP_SHORE_SPLIT?.get(CPHValue.split('/')[1])?.AREA || null
      }
      return value
    }

    const PHONE_NO = await loadExcelToMap(
      sourceFile.find((file) => file.fileName === 'CS_MEASURES.xlsb').data,
      'SBI',
      [
        'LANDLINE',
        'MOBILE',
        'FRN',
        'POST_CODE',
        'CPH_CODE',
        'ORGANISATION_NAME',
        'ADDRESS_LINE1',
        'ADDRESS_LINE2',
        'CITY'
      ],
      'CS_MEASURES'
    )

    const CLAIM_VALUE_DOSSIER = await loadExcelToMap(
      sourceFile.find(
        (file) => file.fileName === 'giles_report_official_sensitive_1.xlsb'
      ).data,
      'Project Ref',
      ['Forecast claim (grant) value', 'Sub Scheme'],
      'giles_report_official_sensitive',
      4
    )

    const selectionBasisRDPConversion = {
      'FETF 2024 AHW Window 1': 'FETF-2024 AHW Rand',
      'FETF 2024 Productivity': 'FETF-2024 Prod Rand',
      'FETF 2024 Slurry': 'FETF-2024 Slry Rand'
    }

    for (const row of worksheet._rows) {
      if (row) {
        if (row.number > 4) {
          const projectId = row.getCell(columnIndex).value
          if (targetProjectIds.includes(projectId)) {
            // Data that needs to be populate in each row
            mappedObject.push({
              ...obj,
              SBICore: row.getCell(getSBIIndex).value || null,
              CPHCore:
                PHONE_NO.get(row.getCell(getSBIIndex).value)?.CPH_CODE || null,
              limtCore: LMT_CORE_CONVERSION(
                LMT_CORE?.get(
                  PHONE_NO.get(row.getCell(getSBIIndex).value)?.CPH_CODE
                )?.['SEO Group']?.result,
                PHONE_NO.get(row.getCell(getSBIIndex).value)?.CPH_CODE,
                row.getCell(getAddressCore4).value
              ),
              FRNCore:
                PHONE_NO.get(row.getCell(getSBIIndex).value)?.FRN || null,
              phoneNoCore:
                cleanNumberField(
                  PHONE_NO.get(row.getCell(getSBIIndex).value)?.LANDLINE
                ) ?? null,
              mobileCore:
                cleanNumberField(
                  PHONE_NO.get(row.getCell(getSBIIndex).value)?.MOBILE
                ) || null,
              customerNameCore:
                PHONE_NO.get(row.getCell(getSBIIndex).value)
                  ?.ORGANISATION_NAME || null,
              lifetimeValueRDP:
                CLAIM_VALUE_DOSSIER.get(row.getCell(columnIndex).value)?.[
                  'Forecast claim (grant) value'
                ] ?? null,
              agreementRefCore: row.getCell(columnIndex)?.value ?? null,
              highValueCore:
                CLAIM_VALUE_DOSSIER.get(row.getCell(columnIndex).value)?.[
                  'Forecast claim (grant) value'
                ] > 50000
                  ? 'Y'
                  : 'N',
              claimValueDossier:
                CLAIM_VALUE_DOSSIER.get(row.getCell(columnIndex).value)?.[
                  'Forecast claim (grant) value'
                ] ?? null,
              addressCore1:
                PHONE_NO.get(row.getCell(getSBIIndex).value)?.ADDRESS_LINE1 ||
                null,
              addressCore2:
                PHONE_NO.get(row.getCell(getSBIIndex).value)?.ADDRESS_LINE2 ||
                null,
              addressCore3:
                PHONE_NO.get(row.getCell(getSBIIndex).value)?.CITY || null,
              addressCore4: row.getCell(getAddressCore4).value ?? null,
              postCodeCore:
                PHONE_NO.get(row.getCell(getSBIIndex).value)?.POST_CODE ?? null,
              selectionBasisRDP:
                (selectionBasisRDPConversion[
                  CLAIM_VALUE_DOSSIER.get(row.getCell(columnIndex).value)?.[
                    'Sub Scheme'
                  ]
                ] ||
                  CLAIM_VALUE_DOSSIER.get(row.getCell(columnIndex).value)?.[
                    'Sub Scheme'
                  ]) ??
                null
            })
          }
        }
      }
    }

    return mappedObject
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error)
  }
}
