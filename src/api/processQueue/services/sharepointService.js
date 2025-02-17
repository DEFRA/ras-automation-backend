import { getAccessToken } from '~/src/api/processQueue/services/msalService.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { config } from '~/src/config/index.js'
import { proxyFetch } from '~/src/helpers/proxy-fetch.js'
import { streamToBuffer } from '../utils/index.js'

const baseUrl = 'https://graph.microsoft.com/v1.0'
const logger = createLogger()
const siteId = config.get('sharePointSiteId')
const driveId = config.get('sharePointDriveId')

export const fetchFileContent = async (filePath) => {
  const accessToken = await getAccessToken()
  const url = `${baseUrl}/sites/${siteId}/drives/${driveId}/root:${filePath}:/content`
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    responseType: 'arraybuffer'
  }

  try {
    const response = await proxyFetch(url, options)
    logger.info('Response got successfully for file content from sharepoint')
    const buffer = await streamToBuffer(response.body)
    logger.info('Stream is ready to be processed')
    return buffer
  } catch (error) {
    logger.error('Error fetching updated file:', error)
    throw error
  }
}

export const uploadFileToSharePoint = async (filePath, transformedBuffer) => {
  logger.info('Entered into upload to sharepoint component')
  const accessToken = await getAccessToken()
  const url = `${baseUrl}/sites/${siteId}/drives/${driveId}/root:${filePath}:/content`
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/octet-stream',
      Accept: 'application/json'
    },
    body: transformedBuffer
  }

  try {
    const response = await proxyFetch(url, options)
    logger.info(
      'Transformed file uploaded to sharepoint successfully.',
      response
    )
  } catch (error) {
    logger.error('Error uploading file', error.message)
    throw error
  }
}
