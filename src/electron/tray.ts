import {
  Menu, Tray
} from 'electron'

let tray!: Tray

export const initializeTray = () => {
  tray = new Tray('./src/electron/icon.png')

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
    { label: 'Connecting...' },
    { label: 'Close', click() { console.log('close clicked') } },
    {
      label: 'Show Colors',
      id: 'color-scale',
      accelerator: 'CmdOrCtrl+1',
      enabled: true
    }
  ])

  tray.on('click', () => {
    console.log('clicked tray!')
  })

  // right-click and some other events does not work (for MacOs?) if you use a contextMenu and did tray.setContextMenu(contextMenu)
  tray.on('right-click', () => {
    console.log('right-clicked tray!')
  })

  // Make a change to the context menu
  contextMenu.items[3].checked = true
  setTimeout(() => {
    console.log('2 secs waited, disabling item...')
    const myItem = contextMenu.getMenuItemById('color-scale')
    myItem.enabled = false
  }, 2000)

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}
