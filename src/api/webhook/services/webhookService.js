import axios from 'axios'
import { config } from '~/src/config/index.js'
import { getAWSToken } from '~/src/api/processQueue/services/sqsService.js'

export const pushSqsMessage = async () => {
  const accessToken = await getAWSToken()
  const Url = config.get('awsGatewayEndPoint')
  const data = {
    message: 'test'
  }
  await axios.post(Url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}
