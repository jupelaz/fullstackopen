import React from 'react'
import { newNote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createNote = event => {
    event.preventDefault()
    dispatch(newNote(event.target.content.value))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNote}>
        <div>
          <input name='content' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
