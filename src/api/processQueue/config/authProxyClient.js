// Import the handleResponse function to process HTTP responses
import { handleResponse } from '~/src/helpers/fetchProxyWrapper.js'
// Import the proxyFetch function to handle HTTP requests with proxy support
import { proxyFetch } from '~/src/helpers/proxy-fetch.js'

// Import the createLogger function to set up logging
import { createLogger } from '~/src/helpers/logging/logger.js'

// Create a logger instance for logging information
const logger = createLogger()

/**
 * Sends an asynchronous GET request using proxyFetch and handles the response.
 * @param {string} url - The URL to send the GET request to.
 * @param {object} options - The options for the fetch request, such as headers.
 * @returns {object} - The processed response object from handleResponse.
 * @throws {Error} - Throws an error if the GET request fails.
 */
const sendGetRequestAsync = async (url, options) => {
  try {
    logger.info('URL to be called to fetch token', url)
    const response = await proxyFetch(url, options)
    logger.info('Response to fetch token', url, response)
    return await handleResponse(response)
  } catch (error) {
    logger.error(`GET request failed: ${error.message}`)
    throw error
  }
}

/**
 * Sends an asynchronous POST request using proxyFetch and handles the response.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} options - The options for the fetch request, such as headers and body.
 * @returns {object} - The processed response object from handleResponse.
 * @throws {Error} - Throws an error if the POST request fails.
 */
const sendPostRequestAsync = async (url, options) => {
  try {
    logger.info('URL to be called to fetch token', url)
    const response = await proxyFetch(url, {
      ...options,
      method: 'POST'
    })
    logger.info('Response to fetch token', url, response)
    return await handleResponse(response)
  } catch (error) {
    logger.error(`POST request failed: ${error.message}`)
    throw error
  }
}

// Export the sendGetRequestAsync and sendPostRequestAsync functions for use in other modules
export { sendGetRequestAsync, sendPostRequestAsync }
