import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { queueUrl, sqs } from '~/src/api/processQueue/config/awsConfig.js'

const logger = createLogger()

export const getSqsMessages = async () => {
  const params = {
    QueueUrl:
      'https://sqs.eu-west-2.amazonaws.com/332499610595/ras_automation_backend',
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 5,
    VisibilityTimeout: 30
  }
  try {
    const data = sqs.receiveMessage(params).promise()
    if (data.Messages) {
      for (const message of data.Messages) {
        // Process message and trigger  internal endpoint
        //  await triggerMicroService(message.Body)

        // Delete message from SQS
        await deleteMessage(message.ReceiptHandle)
      }
    } else {
      return []
    }
  } catch (error) {
    logger.error('Error consuming messages from SQS:', error)
  }
}

export const deleteMessage = async (receiptHandle) => {
  const params = {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle
  }

  try {
    await sqs.deleteMessage(params).promise()
  } catch (error) {
    logger.error('Error deleting message:', error)
  }
}
