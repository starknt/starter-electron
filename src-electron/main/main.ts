import { BrowserWindow, app } from 'electron'

app.whenReady()
  .then(() => {
    const win = new BrowserWindow()

    win.loadURL(process.env.DEV_URL)
  })
  .catch(err => console.error(err))
