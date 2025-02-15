import { config } from '~/src/config/index.js'
import { ProxyAgent, fetch as undiciFetch } from 'undici'
import { createLogger } from './logging/logger.js'

const logger = createLogger()

const nonProxyFetch = (url, opts) => {
  return undiciFetch(url, {
    ...opts
  })
}

const proxyFetch = (url, opts, skipProxy = false) => {
  const proxy = config.get('httpsProxy') ?? config.get('httpProxy')
  logger.info('proxy', proxy)
  logger.info('httpProxy', config.get('httpProxy'))
  logger.info('httpsProxy', config.get('httpsProxy'))
  if (!proxy || skipProxy) {
    return nonProxyFetch(url, opts)
  } else {
    return undiciFetch(url, {
      ...opts,
      dispatcher: new ProxyAgent({
        uri: proxy,
        keepAliveTimeout: 10,
        keepAliveMaxTimeout: 10
      })
    })
  }
}

const proxyFetchWithoutOpts = (url, skipProxy = false) => {
  logger.info('Inside proxyFetchWithoutOpts')
  const proxy = config.get('httpsProxy') ?? config.get('httpProxy')
  const proxyMsg = `Proxy from config: ${proxy}`
  logger.info(proxyMsg)
  logger.info(skipProxy)
  const text = `Boolean expression : ${!proxy || skipProxy}`
  logger.info(text)
  return undiciFetch(url, {
    dispatcher: new ProxyAgent({
      uri: proxy,
      keepAliveTimeout: 10,
      keepAliveMaxTimeout: 10
    })
  })
}

export { proxyFetch, proxyFetchWithoutOpts }
