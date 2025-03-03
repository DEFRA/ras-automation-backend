import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { sqsClient } from '../config/awsConfig.js'
import { transformDataForSQS } from '../utils/index.js'
import { config } from '~/src/config/index.js'
import {
  DeleteMessageCommand,
  ReceiveMessageCommand
} from '@aws-sdk/client-sqs'

const logger = createLogger()
const awsQueueUrl = config.get('awsQueueUrl')

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

  try {
    const data = await sqsClient.send(command)
    logger.info(`Batch message sent successfully: ${JSON.stringify(data)}`)
    await getSqsMessages()
  } catch (error) {
    logger.error(`Error sending batch messages: ${JSON.stringify(error)}`)
  }
}

export const getSqsMessages = async () => {
  const params = {
    QueueUrl: awsQueueUrl,
    MaxNumberOfMessages: 5,
    WaitTimeSeconds: 10,
    VisibilityTimeout: 30
  }
  try {
    const data = await sqsClient.send(new ReceiveMessageCommand(params))
    logger.info('messages in SQS queue', JSON.stringify(data.Messages))
    // if (data.Messages && data.Messages.length > 0) {
    //   for (const message of data.Messages) {
    //     queueInitialInfo.map((record) => {
    //       if (record.fileName === message.MessageBody.fileName) {
    //         record.data = fetchFileContent(record.filePath)
    //       }
    //       return record
    //     })
    //     await transformExcelData(queueInitialInfo)
    //   }
    //   // Delete message from SQS
    //   for (const message of data.Messages) {
    //     await deleteMessage(message.ReceiptHandle)
    //   }
    // } else {
    //   logger.info('No messages available to process')
    // }
  } catch (error) {
    logger.error('Error receiving messages:', error)
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
