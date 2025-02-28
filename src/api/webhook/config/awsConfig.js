import { SQSClient } from '@aws-sdk/client-sqs'
import { config } from '~/src/config/index.js'

const awsRegion = config.get('awsRegion')
export const awsQueueUrl =
  'https://sqs.eu-west-2.amazonaws.com/711387132227/ras_automation_backend'

export const sqsClient = new SQSClient({
  region: awsRegion,
  endpoint: awsQueueUrl
})
