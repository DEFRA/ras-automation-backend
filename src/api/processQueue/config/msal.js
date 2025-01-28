import { ConfidentialClientApplication } from '@azure/msal-node'
import { config } from '~/src/config/index.js'

const tenantId = config.get('azTenantId')
const clientId = config.get('azClientId')
const clientSecret = config.get('azClientSecret')

const msalConfig = {
  auth: {
    clientId,
    authority: tenantId,
    clientSecret
  }
}

export const msalClient = new ConfidentialClientApplication(msalConfig)
