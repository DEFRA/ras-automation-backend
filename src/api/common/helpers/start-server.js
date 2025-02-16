import { config } from '../../../config/index.js'
import { createServer } from '../../../api/index.js'
import { createLogger } from '../../../api/common/helpers/logging/logger.js'
import { fetchFileContent } from '../../processQueue/services/sharepointService.js'
import { queueInitialInfo, messages } from '../constants/queue-initial-data.js'

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

    for (const message of messages) {
      const { filePath, fileName } = message

      try {
        // Fetch file content from SharePoint
        const fileContent = await fetchFileContent(filePath)
        const match = queueInitialInfo.find(
          (file) => file.fileName === fileName
        )
        match.data = fileContent
      } catch (error) {
        logger.error('Error processing message:', error.message)
      }
    }
  } catch (error) {
    logger.info('Server failed to start :(')
    logger.error(error)
  }

  return server
}

export { startServer, queueInitialInfo }
