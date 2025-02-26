import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export const sharePointFileinfo = (data) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const filePath = path.join(__dirname, '../db/array.json')
  const storedValue = data.value.map(
    ({ name, lastModifiedDateTime, id, webUrl }) => ({
      name,
      lastModifiedDateTime,
      id,
      webUrl
    })
  )
  fs.writeFileSync(filePath, JSON.stringify(storedValue))
  return storedValue
}

export const filteredInfo = (oldArray, newArray, key) => {
  return _.filter(newArray, (newItem) => {
    const oldItem = _.find(oldArray, [key, newItem[key]])
    return !_.isEqual(oldItem, newItem)
  })
}

export const matchFile = (requiredFiles, matchArray) => {
  return _.filter(matchArray, (obj) => _.includes(requiredFiles, obj.name))
}

export const getUpdatedFiles = (data) => {
  return data.value.map(({ name, lastModifiedDateTime, id, webUrl }) => ({
    name,
    lastModifiedDateTime,
    id,
    webUrl
  }))
}
