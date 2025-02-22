import { config } from '../../../config/index.js'
import { createServer } from '../../../api/index.js'
import { createLogger } from '../../../api/common/helpers/logging/logger.js'
import { fetchFileContent } from '../../processQueue/services/sharepointService.js'
import { queueInitialInfo, messages } from '../constants/queue-initial-data.js'
import { fetchFileInfo } from '../../common/services/getFiles.js'
import { sharePointFileinfo } from '../../common/helpers/file-info.js'

let sharePointFile

async function startServer() {
  let server
  const logger = createLogger()
  // const POLLING_INTERVAL = 30000

  try {
    server = await createServer()
    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(
      `Access your backend on http://localhost:${config.get('port')}`
    )

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    // setInterval(async () => {
    //   await checkFilesForTemplate()
    // }, POLLING_INTERVAL)

    // await createSubscription()

    const fileInfo = await fetchFileInfo()
    sharePointFile = sharePointFileinfo(fileInfo)

    for (const message of messages) {
      const { filePath, fileName } = message

      // Fetch file content from SharePoint
      const fileContent = await fetchFileContent(filePath)
      const mappedFile = queueInitialInfo.find(
        (file) => file.fileName === fileName
      )
      mappedFile.data = fileContent
    }
  } catch (error) {
    logger.info('Server failed to start :(')
    logger.error(error)
  }

  return server
}

export { startServer, queueInitialInfo, sharePointFile }
