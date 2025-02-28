import { SQSClient } from '@aws-sdk/client-sqs'
import { config } from '~/src/config/index.js'

const awsRegion = config.get('awsRegion')
const awsQueueUrl = config.get('awsQueueUrl')

export const sqsClient = new SQSClient({
  region: awsRegion,
  endpoint: awsQueueUrl
})
