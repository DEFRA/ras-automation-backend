export const transformDataForSQS = (messages) => {
  return messages.map((msg) => {
    return {
      fileName: `${msg.name}`,
      id: `${msg.id}`,
      webUrl: `${msg.webUrl}`
    }
  })
}
