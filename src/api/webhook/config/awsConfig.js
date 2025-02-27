import { SQSClient } from '@aws-sdk/client-sqs'
import { config } from '~/src/config/index.js'

const awsRegion = config.get('awsRegion')
const sqsEndpoint =
  'https://sqs.eu-west-2.amazonaws.com/332499610595/ras_automation_backend'

export const sqsClient = new SQSClient({
  region: awsRegion,
  endpoint: sqsEndpoint
})
