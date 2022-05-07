# Electron with React, Typescript and Webpack

An Electron app with React, Typescript, Webpack and hot reloading using [Electron Forge](https://www.electronforge.io/).

`npm install`

`npm start`

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