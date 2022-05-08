import React, { useState } from 'react'

declare global {
  interface ModifiedWindow {
    electronAPI? : any
  }
}

const App = () => {
  const [value, setValue] = useState<string>('bla')

  const setWindowTitle = () => {
    (window as ModifiedWindow).electronAPI.setTitle(value)
  }

  return (
    <div>
      <h1>Hello</h1>
      <br/>
      Title: <input onInput={(e) => setValue((e.target as HTMLInputElement).value)}/>
      <button type="button" onClick={() => setWindowTitle()} >
        Set Window Title
        </button>
    </div>
  )
}

export default App
