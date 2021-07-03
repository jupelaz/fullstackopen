import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { ALL_PERSONS } from './queries'

export const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = _ => {
    setErrorMessage(errorMessage)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
    </div>
  )
}

const Notify = ({ errorMessage }) => (
  <>{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}</>
)
