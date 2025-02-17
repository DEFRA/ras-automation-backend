import { fetchFileInfo } from '../../common/services/getFiles.js'
import {
  sharePointFileinfo,
  filteredInfo
} from '~/src/api/common/helpers/file-info.js'
import { sharePointFile } from '~/src/api/common/helpers/start-server.js'
import { pushSqsMessage } from '~/src/api/processQueue/services/sqsService.js'
import GlobalStore from '../services/globalStore.js'
import _ from 'lodash'

export const webHookController = {
  handler: async (_request, h) => {
    const validationToken = _request.query.validationToken

    const eventId = _request.payload.value[0].clientState

    const data = await fetchFileInfo()

    const ModfifiedFileInfo = sharePointFileinfo(data)

    const result = filteredInfo(
      sharePointFile,
      ModfifiedFileInfo,
      'lastModifiedDateTime'
    )

    if (eventId && _.isEqual(GlobalStore.eventCache.get(eventId), result))
      return h
        .response({ message: 'Notification ignored: Already processed' })
        .code(200)

    if (validationToken) {
      return h.response(validationToken).type('text/plain').code(200)
    }

    GlobalStore.eventCache.set(eventId, result)

    if (result && result.length > 0) await pushSqsMessage(result)
    return h.response({ message: 'success' }).code(200)
  }
}
