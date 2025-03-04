import { config } from '../../../config/index.js'
import { createServer } from '../../../api/index.js'
import { createLogger } from '../../../api/common/helpers/logging/logger.js'
// import { getSubscriptionId } from '../../../api/common/db/data.js'
import { fetchFileContent } from '../../processQueue/services/sharepointService.js'
import { fetchFileInfo } from '../../common/services/getFiles.js'
import { sharePointFileinfo } from '../../common/helpers/file-info.js'
import { queueInitialInfo } from '../constants/queue-initial-data.js'
import { sqsClient } from '~/src/api/processQueue/config/awsConfig.js'
import { transformExcelData } from '../../processQueue/services/transformService.js'
import { deleteMessage } from '../../processQueue/services/sqsService.js'
import { Consumer } from 'sqs-consumer'

let sharePointFile

async function startServer() {
  let server
  const logger = createLogger()
  const awsQueueUrl = config.get('awsQueueUrl')
  const POLLING_INTERVAL = 5 * 1000

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

    const options = {
      config: {
        waitTimeSeconds: 10,
        pollingWaitTimeMs: 10,
        batchSize: 5
      }
    }

    const batchMessageHandler = async (messages) => {
      logger.info(`message: ${JSON.stringify(messages)}`)
      logger.info(`message length: ${JSON.stringify(messages.length)}`)
      try {
        if (messages && messages.length > 0) {
          logger.info(`data message inside: ${JSON.stringify(messages)}`)
          logger.info(
            `data message length inside : ${JSON.stringify(messages.length)}`
          )
          for (const message of messages) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            for (const record of queueInitialInfo) {
              const parsedMessage = JSON.parse(message.Body)
              if (record.fileName === parsedMessage.fileName) {
                logger.info('Entered inside')
                record.data = await fetchFileContent(record.filePath)
              }
            }
            await transformExcelData(queueInitialInfo)
          }
          // Delete message from SQS
          for (const message of messages) {
            await deleteMessage(message.ReceiptHandle)
          }
        } else {
          logger.info('No messages available to process')
        }
      } catch (error) {
        logger.error(`Error while consuming message:, ${JSON.stringify(error)}`)
      }
    }

    const app = Consumer.create({
      queueUrl: awsQueueUrl,
      waitTimeSeconds: options.config.waitTimeSeconds,
      pollingWaitTimeMs: POLLING_INTERVAL,
      shouldDeleteMessages: false,
      batchSize: options.config.batchSize,
      handleMessageBatch: (messages) => batchMessageHandler(messages),
      sqs: sqsClient
    })

    app.start()

    app.on('error', (err) => {
      logger.error(`Error Occured:, ${JSON.stringify(err)}`)
    })
    app.on('processing_error', (err) => {
      logger.error(`Processing error:, ${JSON.stringify(err)}`)
    })

    app.on('timeout_error', (err) => {
      logger.error(`Timeout Error :, ${JSON.stringify(err)}`)
    })

    // await getSubscriptionId()
  } catch (error) {
    logger.info('Server failed to start :(')
    logger.error(error)
  }
  return server
}

export { startServer, sharePointFile }
