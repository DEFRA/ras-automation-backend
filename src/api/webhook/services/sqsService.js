import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { sqsClient, awsQueueUrl } from '../config/awsConfig.js'
import { transformDataForSQS } from '../utils/index.js'

const logger = createLogger()

export const sendMessages = async (messages) => {
  const formattedMsgs = transformDataForSQS(messages)
  for (const message of formattedMsgs) {
    await pushSqsMessage(message)
  }
}

export const pushSqsMessage = async (message) => {
  const command = new SendMessageCommand({
    QueueUrl: awsQueueUrl,
    MessageBody: JSON.stringify(message)
  })

  logger.info(`Batch message before sending: ${JSON.stringify(message)}`)
  logger.info(`Batch message before sending: ${message}`)

  try {
    const data = await sqsClient.send(command)
    logger.info(`Batch message sent successfully: ${JSON.stringify(data)}`)
  } catch (error) {
    logger.error(`Error sending batch messages: ${JSON.stringify(error)}`)
  }
}
