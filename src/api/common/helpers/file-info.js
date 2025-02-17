import _ from 'lodash'

export const sharePointFileinfo = (data) => {
  return data.value.map(({ name, lastModifiedDateTime }) => ({
    name,
    lastModifiedDateTime
  }))
}

export const filteredInfo = (oldArray, newArray, key) => {
  return _.filter(newArray, (newItem) => {
    const oldItem = _.find(oldArray, [key, newItem[key]])
    return !_.isEqual(oldItem, newItem)
  })
}
