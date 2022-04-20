import { useQuery, useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultUser = useQuery(ME, { skip: token === null })
  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }
  console.log('Status')
  console.log('******')
  console.log('User', resultUser.data)
  console.log('token', token)

  return (
    <div>
      <div>{error}</div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors
        authors={resultAuthors?.data?.allAuthors}
        show={page === 'authors'}
      />
      <Books books={resultBooks?.data?.allBooks} show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommended user={resultUser?.data?.me} show={page === 'recommended'} />
      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setError={setError}
        setToken={setToken}
      />
    </div>
  )
}

export default App
