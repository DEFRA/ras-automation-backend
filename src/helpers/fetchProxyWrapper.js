// Import the proxyFetch function to handle HTTP requests with proxy support
import { proxyFetch, proxyFetchWithoutOpts } from './proxy-fetch.js'
// Import the createLogger function to set up logging
import { createLogger } from './logging/logger.js'

// Create a logger instance for logging information
const logger = createLogger()

// const proxyUrlConfig = config.get('httpsProxy') ?? config.get('httpProxy')

/**
 * Handles the response from a fetch request.
 * Extracts headers and processes the response body based on the status code.
 * @param {Response} response - The fetch response object.
 * @returns {object} - An object containing the response body, headers, and status code.
 * @throws {Error} - Throws an error if the response status indicates a failure.
 */
const handleResponse = async (response) => {
  const headers = {}
  response.headers.forEach((value, name) => {
    headers[name] = value
  })
  if (response.status >= 200 && response.status < 300) {
    return {
      body: await response.json(),
      headers,
      status: response.status
    }
  } else {
    const errorMessage = `Request failed with status: ${response.status}`
    logger.info(`Details error response: ${JSON.stringify(response)}`)
    logger.info(errorMessage)
    throw new Error(errorMessage)
  }
}

const handleResponseForNoOpts = async (response) => {
  const headers = {}
  const errorMsg = `Response status: ${response.status}`
  logger.info(errorMsg)
  if (response.status >= 200 && response.status < 300) {
    return {
      body: await response.json(),
      headers,
      status: response.status
    }
  } else {
    const errorMessage = `Request failed with status: ${response.status}`
    logger.info(`Details error response: ${JSON.stringify(response)}`)
    logger.info(errorMessage)
    throw new Error(errorMessage)
  }
}

/**
 * A wrapper function for making fetch requests with proxy support and retry logic.
 * @param {string} url - The URL to fetch.
 * @param {object} options - The fetch options such as method, headers, and body.
 * @param {boolean} [skipProxy] - A flag to skip using the proxy.
 * @param {number} [retries] - The number of retry attempts in case of failure.
 * @returns {object} - The processed response object from handleResponse.
 * @throws {Error} - Throws an error if all retry attempts fail.
 */
const fetchProxyWrapper = async (
  url,
  options,
  skipProxy = false,
  retries = 3
) => {
  let attempt = 0
  while (attempt < retries) {
    try {
      logger.info('Before doing proxy fetch')
      const response = await proxyFetch(
        url,
        {
          ...options,
          method: options?.method || 'get',
          headers: {
            ...(options?.headers ?? options?.headers),
            'Content-Type':
              options?.headers?.['Content-Type'] ?? 'application/json'
          }
        },
        skipProxy
      )
      return await handleResponse(response)
    } catch (error) {
      logger.info(error)
      logger.info(`Attempt ${attempt + 1} failed: ${error.message}`)
      if (attempt < retries - 1) {
        attempt++
        logger.info(`Retrying... (${attempt + 1}/${retries})`)
      } else {
        throw error
      }
    }
  }
}

const fetchProxyWrapperWithNoOptions = async (
  url,
  skipProxy = false,
  retries = 3
) => {
  let attempt = 0
  while (attempt < retries) {
    try {
      logger.info('Before setting up proxy')
      const response = await proxyFetchWithoutOpts(url, skipProxy)
      const responseMsg = `Response sent by proxy : `
      logger.info(responseMsg)
      const responseStatus = `Response status after fetching proxy : ${response.status}`
      logger.info(responseStatus)
      return await handleResponseForNoOpts(response)
      /* const proxyUrl = new URL(url)
      const port = 443
      logger.info(`Proxy set up using ${proxyUrl.origin}:${port}`)
      return {
        proxyUrl,
        port,
        proxyAgent: new ProxyAgent({
          uri: proxyUrl,
          keepAliveTimeout: 10,
          keepAliveMaxTimeout: 10
        }),
        httpAndHttpsProxyAgent: new HttpsProxyAgent(proxyUrl) 
      } */
    } catch (error) {
      logger.info(error)
      logger.info(`Attempt ${attempt + 1} failed: ${error.message}`)
      if (attempt < retries - 1) {
        attempt++
        logger.info(`Retrying... (${attempt + 1}/${retries})`)
      } else {
        throw error
      }
    }
  }
}

// Export the fetchProxyWrapper and handleResponse functions for use in other modules
export { fetchProxyWrapper, handleResponse, fetchProxyWrapperWithNoOptions }
