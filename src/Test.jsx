import React, { useState } from 'react'
import axios from 'axios'

function TestResult(testResult) {
  if (!testResult) return null
  if (testResult.failures === 1) {
    return <h3>테스트에서 에러가 발생했습니다. baseUrl을 확인하세요.</h3>
  }
  let firstDesc = ''
  let secondDesc = ''

  return (
    <>
      {testResult.runs[0].tests.map(({ title, state, error }) => {
        const StateIcon =
          state === 'passed' ? (
            <i className="far fa-check-circle text-success" />
          ) : (
            <i class="fas fa-times" />
          )

        if (firstDesc !== title[0]) {
          firstDesc = title[0]
          return (
            <>
              <h2 className="ml-1">{title[0]}</h2>
              <h3 className="ml-2">{title[1]}</h3>
              <h4 className="ml-3">
              {StateIcon}
                {title[2]}
              </h4>
              <p className="ml-4">{error}</p>
            </>
          )
        } else {
          if (secondDesc !== title[1]) {
            secondDesc = title[1]
            return (
              <>
                <h3 className="ml-2">{title[1]}</h3>
                <h4 className="ml-3">
                {StateIcon}
                  {title[2]}
                </h4>
                <p className="ml-4">{error}</p>
              </>
            )
          } else {
            return (
              <>
                <h4 className="ml-3">
                  {StateIcon}
                  {title[2]}
                </h4>
                <p className="ml-4">{error}</p>
              </>
            )
          }
        }
      })}
    </>
  )
}

export default function Test({ testName, urlName, baseUrl }) {
  const [testResult, setTestResult] = useState(null)
  const testServerUrl = 'http://127.0.0.1:3000'
  const onSubmit = async (toTest) => {
    const { data } = await axios.get(`${testServerUrl}/${toTest}`, {
      params: {
        baseUrl,
      },
    })
    setTestResult(data)
  }
  return (
    <div>
      <hr />
      <button className="btn btn-primary" onClick={() => onSubmit(urlName)}>
        {testName}
      </button>
      {TestResult(testResult)}
    </div>
  )
}
