import React, { useState } from 'react'
import Test from './Test'

function App() {
  const [baseUrl, setBaseUrl] = useState('')
  const tests = [
    {
      testName:'작성 페이지 테스트',
      urlName: 'create',
    },
    {
      testName:'메인 페이지 테스트',
      urlName: 'main',
    },
    {
      testName:'디테일 페이지 테스트',
      urlName: 'detail',
    },
    {
      testName:'통합 페이지 테스트',
      urlName: 'all',
    },
  ]
  return (
    <div className="container">
      <label htmlFor="baseUrl">baseUrl: </label>
      <input
        type="text"
        className="form-control"
        id="baseUrl"
        onChange={(e) => setBaseUrl(e.target.value)}
      />
      {tests.map((test)=>(
        <Test {...test} baseUrl={baseUrl} />
      ))}
      <hr/>
    </div>
  )
}

export default App
