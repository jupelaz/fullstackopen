import React, { useState } from 'react'

const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  if (!props.show) return null
  const books = props.books || []
  const genres = [
    ...new Set(...books.map(book => book.genres && [...book.genres])),
    'all genres'
  ]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(
            b =>
              (selectedGenre === 'all genres' ||
                b.genres.includes(selectedGenre)) && (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author?.name}</td>
                  <td>{b.published}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
      {genres.map(genre => (
        <button
          key={genre}
          onClick={event => {
            setSelectedGenre(event.target.value)
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
