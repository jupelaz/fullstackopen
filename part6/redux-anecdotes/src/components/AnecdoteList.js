import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(
        anecdote => !state.filter || anecdote.content.includes(state.filter)
      )
      .sort((a, b) => b.likes - a.likes)
  )
  console.log(anecdotes)
  const dispatch = useDispatch()
  const vote = id => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(
      setNotification(
        `you voted ${anecdotes.find(anecdote => anecdote.id === id).content}`,
        10
      )
    )
  }
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
