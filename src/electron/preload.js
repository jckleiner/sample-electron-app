// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron')

console.log(' --------- preload js ----------')

contextBridge.exposeInMainWorld('electronAPI', {
  // one-way, renderer -> main
  // renderer sends a title string to main, main sets the window title to that string
  setTitle: (title) => ipcRenderer.send('set-title', title),

  // one-way, main -> renderer
  // optional: send back response from renderer -> main
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback),

  // two-way, renderer <-> main
  // The 'dialog:' prefix on the IPC channel name has no effect on the code. It only serves as a namespace that helps with code readability.
  openFile: () => ipcRenderer.invoke('dialog:openFile')

})
