import React, { useState } from 'react'

declare global {
  interface ModifiedWindow {
    electronAPI? : any
  }
}

const App = () => {
  const [value, setValue] = useState<string>('bla')
  const [counter, setCounter] = useState<number>(0)
  const [filePath, setFilePath] = useState<string>('');

  (window as ModifiedWindow).electronAPI.handleCounter((event: any, increment: number) => {
    console.log('received counter', increment)
    setCounter(counter + increment)
    // optinal, send back value to main
    event.sender.send('counter-value', counter)
  })

  const openDialog = async () => {
    console.log('open')
    const path = await (window as ModifiedWindow).electronAPI.openFile()
    console.log('filePath returned: ', path)
    setFilePath(path)
  }

  const setWindowTitle = () => {
    (window as ModifiedWindow).electronAPI.setTitle(value)
  }

  return (
    <div>
      <div className="div">
        <h3>IPC, one-way, renderer -&gt; main</h3>
        Title: <input onInput={(e) => setValue((e.target as HTMLInputElement).value)}/>
        <button type="button" onClick={() => setWindowTitle()} >
          Set Window Title
        </button>
      </div>

      <div className="div">
        <h3>IPC, one-way (optionally two-way), main -&gt; renderer</h3>
        <p>Use the Menu -&gt; Increment/Decrement to change the counter</p>
        Current value: <strong>{ counter }</strong>
      </div>

      <div className="div">
        <h3>IPC, two-way, main &lt;-&gt; renderer</h3>
        <button type="button" onClick={() => openDialog()} >
          Open Dialog
        </button>
        {filePath ? <p>Selected File: {filePath}</p> : null}
      </div>
    </div>
  )
}

export default App
