import axios from 'axios'
import AWS from 'aws-sdk'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { config } from '~/src/config/index.js'

const awsRegion = config.get('awsRegion')
const awsAccessKeyId = config.get('awsAccessKeyId')
const awsSecretAccessKey = config.get('awsSecretAccessKey')
const awsGatewayEndPoint = config.get('awsGatewayEndPoint')

export const setupAws = () => {
  AWS.config.update({
    region: awsRegion,
    credentials: new AWS.Credentials(awsAccessKeyId, awsSecretAccessKey)
  })

  // create a signer for the request
  const signer = new AWS.Signers.V4(
    new AWS.HttpRequest(process.env.API_GATEWAY_URL, awsRegion),
    'execute-api'
  )

  signer.addAuthorization(AWS.config.credentials, new Date())

  const request = new AWS.HttpRequest(awsGatewayEndPoint, awsRegion)

  return request
}

export const consumeMessages = async () => {
  const logger = createLogger()
  const request = setupAws()

  try {
    const response = await axios.get(awsGatewayEndPoint, {
      headers: request.headers
    })

    logger.log('Messages received from SQS:', response.data)
    return response.data
  } catch (error) {
    logger.error('Error consuming messages from SQS:', error.message)
  }
}
