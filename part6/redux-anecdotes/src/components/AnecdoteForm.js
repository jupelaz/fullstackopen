import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  addNotification,
  deleteNotification,
} from '../reducers/notificationReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = event => {
    event.preventDefault()
    dispatch(newAnecdote(event.target.content.value))
    dispatch(addNotification(`you added ${event.target.content.value}`))
    setTimeout(() => dispatch(deleteNotification()), 5000)
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
