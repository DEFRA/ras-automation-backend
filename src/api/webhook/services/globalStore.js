class GlobalStore {
  constructor() {
    if (!GlobalStore.instance) {
      this.eventCache = new Map()
      this.lastProcessedEvent = { timestamp: 0 }
      GlobalStore.instance = this
    }
    return GlobalStore.instance
  }
}

const instance = new GlobalStore()
Object.freeze(instance)
export default instance
