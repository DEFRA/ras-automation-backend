import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { SendMessageBatchCommand } from '@aws-sdk/client-sqs'
import { sqsClient, awsQueueUrl } from '../config/awsConfig.js'
import { transformDataForSQS } from '../utils/index.js'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'

const logger = createLogger()

function checkCredentials() {
  try {
    const credentials = fromNodeProviderChain()()
    logger.info(`Credentials Fetched: ${JSON.stringify(credentials)}`)
  } catch (err) {
    logger.error(`No credentials found: ${err}`)
  }
}

export const pushSqsMessage = async (messages) => {
  const data = checkCredentials()
  logger.info(`credential info: ${JSON.stringify(data)}`)
  const formattedMsgs = transformDataForSQS(messages)

  if (messages.length > 10) {
    logger.error('AWS SQS allows only 10 messages per batch.')
    return
  }

  const entries = formattedMsgs.map((message, index) => ({
    Id: String(index),
    MessageBody: message
  }))

  logger.info(`entries: ${JSON.stringify(entries)}`)

  const command = new SendMessageBatchCommand({
    QueueUrl: awsQueueUrl,
    Entries: entries
  })

  try {
    const data = await sqsClient.send(command)
    logger.info(`Batch messages sent successfully: ${JSON.stringify(data)}`)
  } catch (error) {
    logger.error(`Error sending batch messages: ${JSON.stringify(error)}`)
  }
}
