import AWS from 'aws-sdk'
import { config } from '~/src/config/index.js'

// Retrieve config for AWS Authentication
const awsRegion = config.get('azTenantId')
const awsAccessId = config.get('awsAccessKeyId')
const awsSecretKey = config.get('awsSecretAccessKey')

AWS.config.update({
  region: awsRegion,
  accessKeyId: awsAccessId,
  secretAccessKey: awsSecretKey
})

export const sqs = new AWS.SQS()

export const queueUrl =
  'https://sqs.eu-west-2.amazonaws.com/332499610595/ras_automation_backend'
