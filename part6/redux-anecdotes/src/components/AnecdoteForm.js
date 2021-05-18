import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteForm = ({ newAnecdote, setNotification }) => {
  const createAnecdote = async event => {
    event.preventDefault()
    const content = event.target.content.value
    newAnecdote(content)
    setNotification(`you created '${content}'`, 10)
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
const ConnectedAnecdoteForm = connect(null, { newAnecdote, setNotification })(
  AnecdoteForm
)
export default ConnectedAnecdoteForm
