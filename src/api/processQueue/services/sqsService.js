import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { SendMessageBatchCommand } from '@aws-sdk/client-sqs'
import { sqsClient } from '../config/awsConfig.js'
import { transformDataForSQS } from '../utils/index.js'

const logger = createLogger()

export const pushSqsMessage = async (messages) => {
  const formattedMsgs = transformDataForSQS(messages)

  if (messages.length > 10) {
    logger.error('AWS SQS allows only 10 messages per batch.')
    return
  }

  const entries = formattedMsgs.map((message, index) => ({
    Id: String(index),
    MessageBody: message
  }))

  logger.info('entries', JSON.stringify(entries))

  const command = new SendMessageBatchCommand({
    QueueUrl:
      'https://sqs.eu-west-2.amazonaws.com/332499610595/ras_automation_backend',
    Entries: entries
  })

  try {
    const data = await sqsClient.send(command)
    logger.info(`Batch messages sent successfully: ${JSON.stringify(data)}`)
  } catch (error) {
    logger.error(`Error sending batch messages: ${JSON.stringify(error)}`)
  }
}
