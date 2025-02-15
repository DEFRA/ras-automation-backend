import { ConfidentialClientApplication } from '@azure/msal-node'
import { config } from '~/src/config/index.js'
// Import HTTP request functions for the auth proxy client
import { sendGetRequestAsync, sendPostRequestAsync } from './authProxyClient.js'

// Retrieve configuration values for Azure AD authentication
const tenantId = config.get('azTenantId')
const clientId = config.get('azClientId')
const clientSecret = config.get('azClientSecret')

// Configure the Azure AD authentication parameters
const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret
  },
  system: {
    networkClient: { sendGetRequestAsync, sendPostRequestAsync }
  }
}

// Create an instance of ConfidentialClientApplication with the specified configuration
export const msalClient = new ConfidentialClientApplication(msalConfig)
