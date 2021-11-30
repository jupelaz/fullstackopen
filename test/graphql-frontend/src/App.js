import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { LoginForm } from './components/LoginForm'
import { PhoneForm } from './components/PhoneForm'
import { ALL_PERSONS } from './queries'

export const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()
  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = _ => {
    setErrorMessage(errorMessage)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }
  return (
    <div>
      <button onClick={logout}>
        logout
      </button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({ errorMessage }) => (
  <>{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}</>
)
