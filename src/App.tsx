import React, { useState } from 'react'

declare global {
  interface ModifiedWindow {
    electronAPI? : any
  }
}

const openDialog = async () => {
  console.log('open')
  const filePath = await (window as ModifiedWindow).electronAPI.openFile()
  console.log('filePath returned: ', filePath)
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

      <br/><br/>

      <button type="button" onClick={() => openDialog()} >
        Open Dialog
      </button>
    </div>
  )
}

export default App
