import { config } from '../../../config/index.js'
import { createServer } from '../../../api/index.js'
import { createLogger } from '../../../api/common/helpers/logging/logger.js'
// import { getSubscriptionId } from '../../../api/common/db/data.js'
import { fetchFileContent } from '../../processQueue/services/sharepointService.js'
import { queueInitialInfo } from '../constants/queue-initial-data.js'
import { sqsClient } from '~/src/api/processQueue/config/awsConfig.js'
import { transformExcelData } from '../../processQueue/services/transformService.js'
import { deleteMessage } from '../../processQueue/services/sqsService.js'
import { Consumer } from 'sqs-consumer'

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

    const options = {
      config: {
        waitTimeSeconds: 10,
        pollingWaitTimeMs: 10,
        batchSize: 5
      }
    }

    const batchMessageHandler = async (data) => {
      logger.info(`message: ${JSON.stringify(data)}`)
      try {
        if (data.Messages && data.Messages.length > 0) {
          logger.info(`data message: ${JSON.stringify(data.Messages)}`)
          logger.info(
            `data message length: ${JSON.stringify(data.Messages.length)}`
          )
          for (const message of data.Messages) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            queueInitialInfo.map(async (record) => {
              if (record.fileName === JSON.parse(message.Body).fileName) {
                record.data = await fetchFileContent(record.filePath)
              }
              return record
            })
            logger.info(
              `updated queue Info: ${JSON.stringify(queueInitialInfo)}`
            )
            await transformExcelData(queueInitialInfo)
          }
          // Delete message from SQS
          for (const message of data.Messages) {
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
      handleMessage: (messages) => batchMessageHandler(messages),
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

export { startServer }
