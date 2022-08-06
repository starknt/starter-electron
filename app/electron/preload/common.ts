import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('$api', {
  sayHello() {
    ipcRenderer.send('sayHello', 'hello')
  },
})
