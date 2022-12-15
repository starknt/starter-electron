export class BroadcastDataChannel<T> {
  private broadcastChannel: BroadcastChannel

  onDidReceiveData?: (data: T) => void

  constructor(private readonly channelName: string) {
    this.broadcastChannel = new BroadcastChannel(this.channelName)

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
    this.broadcastChannel.postMessage(data)
  }
}
