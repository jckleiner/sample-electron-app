// import path from 'path';
// import url from 'url';
// import {
//   app,
//   Menu,
//   Tray,
//   BrowserWindow, ipcMain, Tray
// } from 'electron';

// let MainTray: Tray | undefined;
// let TrayWindow: BrowserWindow | undefined;

// const WINDOW_SIZE_DEFAULTS = {
//   width: 200,
//   height: 300,
//   margin: {
//     x: 0,
//     y: 0
//   }

// };

// const a = '';

// // export function initTray() {
// //     MainTray = new Tray(path.join(__dirname, "trayIcon.png"))
// //     createWindow()

// //     MainTray.on("click", () => {
// //         ipcMain.emit("trat-window-clicked", { window: TrayWindow, tray: MainTray })
// //         toggleTrayWindow()
// //     })

// //     alightWindow()

// //     ipcMain.emit("tray-window-ready", { window: TrayWindow, tray: MainTray })
// // }

// let tray = null;

// export default function doStuff() {
//   app.on('ready', () => {
//     tray = new Tray(path.join(__dirname, './icon.png'));

//     console.log(' ----- works ???');

//     //   if (process.platform === 'win32') {
//     //     tray.on('click', tray.popUpContextMenu);
//     //   }

//     const menu = Menu.buildFromTemplate([
//       {
//         label: 'Quit',
//         click() { app.quit(); }
//       }
//     ]);

//     tray.setToolTip('Clipmaster');
//     tray.setContextMenu(menu);
//   });
// }
