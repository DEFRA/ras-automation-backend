import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { queueUrl, sqs } from '~/src/api/processQueue/config/awsConfig.js'
// import { config } from '~/src/config/index.js'
// import qs from 'qs'
// import { proxyFetch } from '~/src/helpers/proxy-fetch.js'
import { transformExcelData } from './transformService.js'
import { queueInitialInfo } from '~/src/api/common/constants/queue-initial-data.js'
import { transformDataForSQS } from '../utils/index.js'
import { fetchFileContent } from './sharepointService.js'

const logger = createLogger()
// const awsAccessKeyId = config.get('awsAccessKeyId')
// const awsSecretAccessKey = config.get('awsSecretAccessKey')
// const awsTokenURL = config.get('awsTokenURL')

export const getSqsMessages = async () => {
  const params = {
    QueueUrl:
      'https://sqs.eu-west-2.amazonaws.com/332499610595/ras_automation_backend',
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 5,
    VisibilityTimeout: 30
  }
  try {
    const data = await sqs.receiveMessage(params).promise()
    logger.info('messages in SQS queue', JSON.stringify(data.Messages))
    if (data.Messages) {
      for (const message of data.Messages) {
        queueInitialInfo.map((record) => {
          if (record.fileName === message.messageBody.fileName) {
            record.data = fetchFileContent(record.filePath)
          }
          return record
        })
        await transformExcelData(queueInitialInfo)
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

// export const getAWSToken = async () => {
//   const requestData = qs.stringify({
//     grant_type: 'client_credentials',
//     client_id: awsAccessKeyId,
//     client_secret: awsSecretAccessKey,
//     scope: 'ras-automation-backend-resource-srv/access'
//   })
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: requestData
//   }
//   const response = await proxyFetch(awsTokenURL, options)

//   const result = await response.json()

//   return result.access_token
// }

// export const pushSqsMessage = async (data) => {
//   const formattedMsgs = transformDataForSQS(data)

//   const entries = formattedMsgs.map((message, index) => ({
//     Id: String(index),
//     MessageBody: message
//   }))

//   const accessToken = await getAWSToken()
//   const Url = config.get('awsGatewayEndPoint')
//   const options = {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(entries)
//   }

//   logger.info(`Options object pushing:, ${JSON.stringify(options)}`)

//   proxyFetch(Url, options)
//     .then((res) => {
//       logger.info('Got success from SQS Queue after pushing')
//       return res.status
//     })
//     .catch((error) => {
//       logger.error('Got error while pushing messages to Queue', error)
//     })
// }

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

  const params = {
    QueueUrl:
      'https://sqs.eu-west-2.amazonaws.com/332499610595/ras_automation_backend',
    Entries: entries
  }

  try {
    const data = await sqs.sendMessageBatch(params).promise()
    logger.info('Batch messages sent successfully:', data)
    await getSqsMessages()
  } catch (error) {
    logger.error('Error sending batch messages:', error)
  }
}
