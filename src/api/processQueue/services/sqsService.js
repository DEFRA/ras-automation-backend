import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import {
  SendMessageBatchCommand,
  DeleteMessageCommand
} from '@aws-sdk/client-sqs'
import { sqsClient } from '../config/awsConfig.js'
import { transformDataForSQS } from '../utils/index.js'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'
import { config } from '~/src/config/index.js'

const logger = createLogger()
const awsQueueUrl = config.get('awsQueueUrl')

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

export const deleteMessage = async (receiptHandle) => {
  const params = {
    QueueUrl: awsQueueUrl,
    ReceiptHandle: receiptHandle
  }

  try {
    await sqsClient.send(new DeleteMessageCommand(params))
    logger.info('Message deleted successfully')
  } catch (error) {
    logger.error('Error deleting message:', error)
  }
}
