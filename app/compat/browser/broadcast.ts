export class BroadcastDataChannel<T> {
  private broadcastChannel: BroadcastChannel | undefined

  onDidReceiveData?: (data: T) => void

  constructor(private readonly channelName: string) {
    this.broadcastChannel = new BroadcastChannel(channelName)

    const listener = (event: MessageEvent<T>) => {
      this?.onDidReceiveData?.(event.data)
    }

    this.broadcastChannel.addEventListener('message', listener)

    window.addEventListener('beforeunload', () => {
      if (this.broadcastChannel) {
        this.broadcastChannel.removeEventListener('message', listener)
        this.broadcastChannel.close()
      }
    })
  }

  postData(data: T): void {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(data)
    }
    else {
      // remove previous changes so that event is triggered even if new changes are same as old changes
      window.localStorage.removeItem(this.channelName)
      window.localStorage.setItem(this.channelName, JSON.stringify(data))
    }
  }
}
