export const transformDataForSQS = (messages) => {
  return messages.map(
    (msg) => `{ fileName: ${msg.name}, id: ${msg.id}, webUrl: ${msg.webUrl} }`
  )
}
