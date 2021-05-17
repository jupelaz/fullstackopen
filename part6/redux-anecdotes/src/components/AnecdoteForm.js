import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  addNotification,
  deleteNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createAnecdote = async event => {
    event.preventDefault()
    const content = event.target.content.value
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newAnecdote))
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
