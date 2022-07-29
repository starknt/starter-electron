import { app, BrowserWindow } from 'electron'

app.whenReady()
    .then(() => {
        const win = new BrowserWindow()

        console.log(123456)

        win.loadURL(`http://127.0.0.1:5173`)
    })
    .catch((err) => console.error(err))