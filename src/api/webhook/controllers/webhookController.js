import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { fetchFileInfo } from '../../common/services/getFiles.js'
import {
  filteredInfo,
  matchFile,
  getUpdatedFiles
} from '~/src/api/common/helpers/file-info.js'
import { REQUIRED_FILES } from '~/src/api/common/constants/queue-initial-data.js'
import { pushSqsMessage } from '~/src/api/processQueue/services/sqsService.js'
import GlobalStore from '../services/globalStore.js'
import { config } from '~/src/config/index.js'
import _ from 'lodash'

const CLIENT_STATE_WEBHOOK = config.get('clientState')
export const webHookController = {
  handler: async (_request, h) => {
    const validationToken = _request.query.validationToken
    if (validationToken) {
      return h.response(validationToken).type('text/plain').code(200)
    }

    const { clientState } = _request.payload.value[0]

    if (!clientState || clientState !== CLIENT_STATE_WEBHOOK) {
      return h.response({ error: 'Unauthorized' }).code(401)
    }

    const eventId = _request.payload.value[0].clientState

    const data = await fetchFileInfo()

    const ModifiedFileInfo = getUpdatedFiles(data)

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const filePath = path.join(__dirname, '../../common/db/array.json')

    const result = filteredInfo(
      JSON.parse(fs.readFileSync(filePath, 'utf-8')),
      ModifiedFileInfo,
      'lastModifiedDateTime'
    )

    fs.writeFileSync(filePath, JSON.stringify(ModifiedFileInfo))

    if (eventId && _.isEqual(GlobalStore.eventCache.get(eventId), result))
      return h
        .response({ message: 'Notification ignored: Already processed' })
        .code(200)

    GlobalStore.eventCache.set(eventId, result)

    if (result && result.length > 0)
      await pushSqsMessage(matchFile(REQUIRED_FILES, result))
    return h.response({ message: 'success' }).code(200)
  }
}
