import { config } from '../../../config/index.js'
import { createServer } from '../../../api/index.js'
import { createLogger } from '../../../api/common/helpers/logging/logger.js'
// import { getSubscriptionId } from '../../../api/common/db/data.js'
import { fetchFileContent } from '../../processQueue/services/sharepointService.js'
import { fetchFileInfo } from '../../common/services/getFiles.js'
import { sharePointFileinfo } from '../../common/helpers/file-info.js'
import { queueInitialInfo } from '../constants/queue-initial-data.js'

let sharePointFile

async function startServer() {
  let server
  const logger = createLogger()

  try {
    server = await createServer()
    await server.start()
    server.logger.info('Server started successfully')
    server.logger.info(
      `Access your backend on http://localhost:${config.get('port')}`
    )

    const fileInfo = await fetchFileInfo()
    sharePointFile = sharePointFileinfo(fileInfo)

    for (const message of queueInitialInfo) {
      const { filePath } = message

      // Fetch file content from SharePoint
      const fileContent = await fetchFileContent(filePath)
      message.data = fileContent
    }

    // await getSubscriptionId()
  } catch (error) {
    logger.info('Server failed to start :(')
    logger.error(error)
  }
  return server
}

export { startServer, sharePointFile }
