# Electron with React, Typescript and Webpack

An Electron app with React, Typescript, Webpack and hot reloading using [Electron Forge](https://www.electronforge.io/).

`npm install`

`npm start`

## Building Distributables
If you run the make script Electron Forge will generate you platform specific distributables for you to share with everyone.
For more information on what kind of distributables you can make, check out the [Makers](https://www.electronforge.io/config/makers) documentation.

`npm run make`

## Steps to set up this project
### 1. TypeScript + Webpack 
(https://www.electronforge.io/templates/typescript-+-webpack-template)

`npx create-electron-app my-new-app --template=typescript-webpack` 


### 2. React with TypeScript
(https://www.electronforge.io/guides/framework-integration/react-with-typescript)

    npm install --save react react-dom
    npm install --save-dev @types/react @types/react-dom

**src/app.tsx**

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function render() {
  ReactDOM.render(<h2>Hello from React!</h2>, document.body);
}

render();
```

**src/renderer.ts**
```tsx
// Add this to the end of the existing file
import './app';
```

### 3. Other Stuff

the app could not load the preload script that were defined in the `BrowserWindow` object
because it was not copied over to the `.webpack` folder.

`Unable to load preload script: .../sample-electron-app/.webpack/main/preload.ts`

I used `CopyWebpackPlugin` to solve this.

## Limitations / Todos

 [ ] Open window in system tray

 * `right-click` and some other events does not work (for MacOs?) if you use a `contextMenu` and did `tray.setContextMenu(contextMenu)`
 * Hot reload does not work for system tray or preload.js changes
 * Preload is a JS file, should make it TS. How can you ensure type safety? Also auto completion?
 * `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 update-counter listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`. With each increment/decrement, more an more listeners are added.
 * . <a>'s are opened inside the app, not with the default browser