import { getAccessToken } from '~/src/api/processQueue/services/msalService.js'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { config } from '~/src/config/index.js'
import { proxyFetch } from '~/src/helpers/proxy-fetch.js'

const baseUrl = 'https://graph.microsoft.com/v1.0'
const logger = createLogger()
const siteId = config.get('sharePointSiteId')
const driveId = config.get('sharePointDriveId')

export const fetchFileInfo = async () => {
  const accessToken = await getAccessToken()
  const url = `${baseUrl}/sites/${siteId}/drives/${driveId}/root:/Selection/FETF:/children`
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await proxyFetch(url, options)
    logger.info('Got File Info from sharepoint')
    return response.json()
  } catch (error) {
    logger.error('Error fetching updated file:', error)
    throw error
  }
}
