import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_RECOM } from '../queries'
const Books = ({ show, user }) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS_RECOM)
  const findBooks = (genre) => {
    getBooks({
      variables: { genre: genre }
    })
  }
  const [books, setBooks] = useState(null)
  useEffect(() => {
    if (user && user.favoriteGenre) {
      console.log('User in reccomended', user)
      findBooks(user.favoriteGenre)
      if (result.data) {
        setBooks(result.data.AllBooks)
      }
    }
  }, [user])

  if (!show) return null

  if (!user?.favoriteGenre) return <div>Loading...</div>
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {user?.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books &&
            books.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author?.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
