import { config } from '~/src/config/index.js'
import qs from 'qs'
import { proxyFetch } from '~/src/helpers/proxy-fetch.js'

const awsAccessKeyId = config.get('awsAccessKeyId')
const awsSecretAccessKey = config.get('awsSecretAccessKey')
const awsTokenURL = config.get('awsTokenURL')

export const getAWSToken = async () => {
  const requestData = qs.stringify({
    grant_type: 'client_credentials',
    client_id: awsAccessKeyId,
    client_secret: awsSecretAccessKey,
    scope: 'ras-automation-backend-resource-srv/access'
  })
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    requestData
  }
  const response = await proxyFetch(awsTokenURL, options, true)

  return response.data.access_token
}

export const pushSqsMessage = async () => {
  const accessToken = await getAWSToken()
  const Url = config.get('awsGatewayEndPoint')
  const data = {
    message: 'test'
  }
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    data
  }

  await proxyFetch(Url, options, true)
}
