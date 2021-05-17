import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = async event => {
    event.preventDefault()
    const content = event.target.content.value
    dispatch(newAnecdote(content))
    dispatch(setNotification(`you created '${content}'`, 10))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='content' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
