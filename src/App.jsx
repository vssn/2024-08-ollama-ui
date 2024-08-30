import './App.css'
import Chat from './Chat'

function App() {
  return (
    <>
      <h1>Little language model</h1>
      <div className="card">
        <Chat></Chat>
      </div>
      <p className="read-the-docs">
        Enter a prompt to get an AI model response.
      </p>
    </>
  )
}

export default App
