import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { sqsClient } from '../config/awsConfig.js'
import { transformDataForSQS } from '../utils/index.js'
import { config } from '~/src/config/index.js'
import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'

const logger = createLogger()
const awsQueueUrl = config.get('awsQueueUrl')

export const checkCredentials = () => {
  try {
    const credentials = fromNodeProviderChain()()
    logger.info(`Credentials Fetched: ${JSON.stringify(credentials)}`)
  } catch (err) {
    logger.error(`No credentials found: ${err}`)
  }
}

export const sendMessages = async (messages) => {
  checkCredentials()
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

  try {
    const data = await sqsClient.send(command)
    logger.info(`Batch message sent successfully: ${JSON.stringify(data)}`)
  } catch (error) {
    logger.error(`Error sending batch messages: ${JSON.stringify(error)}`)
  }
}
