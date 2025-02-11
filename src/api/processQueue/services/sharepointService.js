import axios from 'axios'
import { getAccessToken } from '~/src/api/processQueue/services/msalService.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { config } from '~/src/config/index.js'

const baseUrl = 'https://graph.microsoft.com/v1.0'
const logger = createLogger()
const siteId = config.get('sharePointSiteId')
const driveId = config.get('sharePointDriveId')

export const fetchFileContent = async (filePath) => {
  const accessToken = await getAccessToken()
  const url = `${baseUrl}/sites/${siteId}/drives/${driveId}/root:${filePath}:/content`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      responseType: 'arraybuffer'
    })

    return response.data
  } catch (error) {
    logger.error('Error fetching updated file:', error)
    throw error
  }
}

export const uploadFileToSharePoint = async (filePath, transformedBuffer) => {
  const accessToken = await getAccessToken()
  const url = `${baseUrl}/sites/${siteId}/drives/${driveId}/root:${filePath}:/content`

  try {
    const response = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/octet-stream'
      },
      transformedBuffer
    })
    logger.log(
      'Transformed file uploaded to sharepoint successfully.',
      response.data
    )
  } catch (error) {
    logger.error('Error uploading file', error.message)
    throw error
  }
}
