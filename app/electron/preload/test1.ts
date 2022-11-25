import { ipcRenderer } from 'electron'

export function sayHello() {
  ipcRenderer.send('sayHello', 'hello')
}
