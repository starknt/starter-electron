import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('$test1', {
  sayHello() {
    ipcRenderer.send('sayHello', 'test1')
  },
})
