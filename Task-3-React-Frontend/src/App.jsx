import { useState } from 'react'
import './App.css'
import Apodpage from './screens/apodpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Apodpage/>
    </>
  )
}

export default App
