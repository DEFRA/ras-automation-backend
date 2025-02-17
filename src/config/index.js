import convict from 'convict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const isProduction = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
const config = convict({
  serviceVersion: {
    doc: 'The service version, this variable is injected into your docker container in CDP environments',
    format: String,
    nullable: true,
    default: null,
    env: 'SERVICE_VERSION'
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3001,
    env: 'PORT'
  },
  serviceName: {
    doc: 'Api Service Name',
    format: String,
    default: 'ras-automation-backend'
  },
  root: {
    doc: 'Project root',
    format: String,
    default: path.resolve(dirname, '../..')
  },
  isProduction: {
    doc: 'If this application running in the production environment',
    format: Boolean,
    default: isProduction
  },
  isDevelopment: {
    doc: 'If this application running in the development environment',
    format: Boolean,
    default: isDev
  },
  isTest: {
    doc: 'If this application running in the test environment',
    format: Boolean,
    default: isTest
  },
  log: {
    enabled: {
      doc: 'Is logging enabled',
      format: Boolean,
      default: !isTest,
      env: 'LOG_ENABLED'
    },
    level: {
      doc: 'Logging level',
      format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      default: 'info',
      env: 'LOG_LEVEL'
    },
    format: {
      doc: 'Format to output logs in.',
      format: ['ecs', 'pino-pretty'],
      default: isProduction ? 'ecs' : 'pino-pretty',
      env: 'LOG_FORMAT'
    },
    redact: {
      doc: 'Log paths to redact',
      format: Array,
      default: isProduction
        ? ['req.headers.authorization', 'req.headers.cookie', 'res.headers']
        : ['req', 'res', 'responseTime']
    }
  },
  mongoUri: {
    doc: 'URI for mongodb',
    format: String,
    default: 'mongodb://127.0.0.1:27017/',
    env: 'MONGO_URI'
  },
  mongoDatabase: {
    doc: 'database for mongodb',
    format: String,
    default: 'ras-automation-backend',
    env: 'MONGO_DATABASE'
  },
  httpProxy: {
    doc: 'HTTP Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'CDP_HTTP_PROXY'
  },
  httpsProxy: {
    doc: 'HTTPS Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'CDP_HTTPS_PROXY'
  },
  azTenantId: {
    doc: 'The azure tenant ID',
    format: String,
    required: true,
    default: 'a1b2',
    env: 'AZ_TENANT_ID',
    sensitive: true
  },
  azClientId: {
    doc: 'The azure client ID',
    format: String,
    required: true,
    default: 'a1b2',
    env: 'AZ_CLIENT_ID',
    sensitive: true
  },
  azClientSecret: {
    doc: 'The azure client secret',
    format: String,
    required: true,
    default: 'a1b2c3',
    env: 'AZ_CLIENT_SECRET',
    sensitive: true
  },
  awsRegion: {
    doc: 'AWS region',
    format: String,
    default: 'eu-west-2',
    env: 'AWS_REGION'
  },
  awsAccessKeyId: {
    doc: 'AWS Access KeyId',
    format: String,
    default: '',
    env: 'AWS_ACCESS_KEY_ID'
  },
  awsSecretAccessKey: {
    doc: 'AWS Secret Access Key',
    format: String,
    default: '',
    env: 'AWS_SECRET_ACCESS_KEY'
  },
  awsGatewayEndPoint: {
    doc: 'AWS Gateway EndPoint',
    format: String,
    default: '',
    env: 'AWS_GATEWAY_ENDPOINT'
  },
  awsTokenURL: {
    doc: 'AWS Token EndPoint',
    format: String,
    default: '',
    env: 'AWS_TOKEN_ENDPOINT'
  },
  sharePointSiteId: {
    doc: 'Sharepoint Site Id',
    format: String,
    default: 'test',
    env: 'SP_SITE_ID'
  },
  sharePointDriveId: {
    doc: 'Sharepoint Drive Id',
    format: String,
    default: 'test',
    env: 'SP_DRIVE_ID'
  },
  emailTemplateId: {
    doc: 'Email Template Id',
    format: String,
    default: '78fd5f28-cd3c-4148-83d5-299499b9c4e7',
    env: 'GOV_EMAIL_TEMPLATE_ID'
  },
  emailAPIKey: {
    doc: 'Email API Key',
    format: String,
    default:
      'rasimisnotification-66b9c1f6-75d1-4ac1-abea-321c9fb9186b-b30af13d-77a6-477f-a796-09fb8f9401c3',
    env: 'GOV_EMAIL_API_KEY'
  },
  emailServiceEndPoint: {
    doc: 'Email Service End Point',
    format: String,
    default: 'https://api.notifications.service.gov.uk/v2/notifications/email',
    env: 'GOV_EMAIL_SERVICE_END_POINT'
  },
  isSecureContextEnabled: {
    doc: 'Enable Secure Context',
    format: Boolean,
    default: isProduction,
    env: 'ENABLE_SECURE_CONTEXT'
  },
  isMetricsEnabled: {
    doc: 'Enable metrics reporting',
    format: Boolean,
    default: isProduction,
    env: 'ENABLE_METRICS'
  },
  tracing: {
    header: {
      doc: 'Which header to track',
      format: String,
      default: 'x-cdp-request-id',
      env: 'TRACING_HEADER'
    }
  }
})

config.validate({ allowed: 'strict' })

export { config }
