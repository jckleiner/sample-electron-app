import {
  app, BrowserWindow, Menu, ipcMain, dialog
} from 'electron'
import fs from 'fs'
import path from 'path'
import fuzzysort from 'fuzzysort'
// import { initializeTrayWithContextMenu } from './trayWithContextMenu'
import { createTrayWindow } from './trayWithWindow'

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createMainWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preloadScripts/preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

function handleSetTitle(event: { sender: any }, title: string) {
  const webContents = event.sender
  const window = BrowserWindow.fromWebContents(webContents)
  window.setTitle(title)
}

async function handleFileOpen(event: { sender: any }) {
  console.log('handleFileOpen...')

  const { canceled, filePaths } = await dialog.showOpenDialog(BrowserWindow.fromWebContents(event.sender))
  if (canceled) {
    return null
  }
  return filePaths[0]
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// or use app.whenReady().then(() => ...)
app.on('ready', () => {
  console.log('\n --- app ready ---')

  // main window
  // initializeTrayWithContextMenu()

  // tray with a window in it
  createTrayWindow()

  ipcMain.on('set-title', handleSetTitle)
  ipcMain.handle('dialog:openFile', handleFileOpen)

  createMainWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

ipcMain.on('counter-value', (_event, value) => {
  console.log('counter came back from renderer:', value) // will print value to Node console
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function readFile() {
  fs.readFile('/Users/kleiner/.bashrc', 'utf8', (err, data) => {
    if (err) {
      console.error('\n--> error readFile()', err)
      return
    }
    console.log('\n--> readFile()', data)
  })

  const result = fuzzysort.single('query', 'some string that contains my query.')

  // const mystuff = [{ file: 'Monitor.cpp' }, { file: 'MeshRenderer.cpp' }]
  // const results = fuzzysort.go('mr', mystuff, { key: 'file' })
  // [{score:-18, obj:{file:'MeshRenderer.cpp'}}, {score:-6009, obj:{file:'Monitor.cpp'}}]
  console.log('\n---> result', result)
  const highlight = fuzzysort.highlight(result, '<b>', '</b>')
  console.log('\n---> highlight:', highlight)
}
readFile()
