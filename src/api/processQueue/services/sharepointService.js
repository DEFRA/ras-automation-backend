import axios from 'axios'
import { getAccessToken } from './msalService.js'
import { createLogger } from '../../common/helpers/logging/logger.js'
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
      responseType: 'arrayBuffer'
    })
    return response.data
  } catch (error) {
    logger.error('Error fetching updated file:', error)
    throw error
  }
}

export const uploadFileToSharePoint = async (filePath, transformedBuffer) => {
  const accessToken = await getAccessToken()
  const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:${filePath}:/content`
  try {
    await axios.put(url, transformedBuffer, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    logger.log('Transformed file uploaded to sharepoint successfully.')
  } catch (error) {
    logger.error('Error uploading file', error.message)
    throw error
  }
}
