import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [baseUrl, setBaseUrl] = useState('')
  const [testResult, setTestResult] = useState(null)
  const testServerUrl = 'http://127.0.0.1:3000'
  const onSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.get(`${testServerUrl}?baseUrl=${baseUrl}`)

    setTestResult(data)
  }
  console.log(testResult)
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <label htmlFor="baseUrl">baseUrl: </label>
        <input
          type="text"
          className="form-control"
          id="baseUrl"
          onChange={(e) => setBaseUrl(e.target.value)}
        />
        <button className="btn btn-primary">테스트실행</button>
      </form>
      <hr />
      <div>{testResult && testResult.runs[0].tests.map(test=>(
        <>
        <h2>{test.title}</h2>
        <p>{test.state}</p>
        <p>{test.error}</p>
        </>
      ))}</div>
    </div>
  )
}

export default App
