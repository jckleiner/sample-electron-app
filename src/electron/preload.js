// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron')

console.log(' --------- preload js ----------')

contextBridge.exposeInMainWorld('electronAPI', {
  // one-way
  setTitle: (title) => ipcRenderer.send('set-title', title),

  // two-way
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
