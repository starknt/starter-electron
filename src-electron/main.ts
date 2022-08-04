import { BrowserWindow, app } from 'electron'

app.whenReady()
  .then(() => {
    const win = new BrowserWindow()

    const isMpa = () => process.env.MODE === 'mpa'

    const resolvePage = (page?: string) => {
      if (process.env.NODE_ENV === 'development')
        return isMpa() ? new URL(`pages/${page ?? 'main'}/`, process.env.DEV_URL).toString() : process.env.DEV_URL

      return isMpa() ? new URL(`${process.env.URL}/${page}/index.html`, `file:///${__dirname}`).toString() : new URL(process.env.URL, `file:///${__dirname}`).toString()
    }

    // eslint-disable-next-line no-console
    console.log(process.env.MODE, resolvePage('main'))

    win.loadURL(resolvePage('main'))

    win.webContents.openDevTools()
  })
  .catch(err => console.error(err))
