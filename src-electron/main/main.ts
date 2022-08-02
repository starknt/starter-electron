import { BrowserWindow, app } from 'electron'

app.whenReady()
  .then(() => {
    const win = new BrowserWindow({

    })

    const pageUrl = () => {
      if (process.env.NODE_ENV === 'development')
        return process.env.DEV_URL

      return new URL(process.env.URL, `file:///${__dirname}`).toString()
    }

    win.loadURL(pageUrl())

    win.webContents.openDevTools()
  })
  .catch(err => console.error(err))
