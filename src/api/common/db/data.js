// import fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import { createSubscription } from '../../webhook/services/graphWebhookService.js'
// import { createLogger } from '../../../api/common/helpers/logging/logger.js'

// const logger = createLogger()

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const filePath = path.resolve(__dirname, './data.json')

// export const readSubscriptionFile = () => {
//   try {
//     if (fs.existsSync(filePath)) {
//       const fileContent = fs.readFileSync(filePath, 'utf-8').trim()
//       return fileContent ? JSON.parse(fileContent) : {}
//     }
//   } catch (error) {
//     logger.error('Error reading subscription file:', error)
//   }
//   return {}
// }

// export const getSubscriptionId = async () => {
//   const data = readSubscriptionFile()
//   if (data.subscriptionId) {
//     return data.subscriptionId
//   }
//   const newSubscriptionId = await createSubscription()
//   fs.writeFileSync(
//     filePath,
//     JSON.stringify({ subscriptionId: newSubscriptionId }, 'utf-8')
//   )
// }
