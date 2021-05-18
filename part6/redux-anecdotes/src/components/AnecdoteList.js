import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = props => {
  const vote = id => {
    console.log('vote', id)
    props.addVote(id)

    props.setNotification(
      `you voted ${
        props.anecdotes.find(anecdote => anecdote.id === id).content
      }`,
      10
    )
  }
  console.log(props.anecdotes)
  return (
    <>
      {props.anecdotes.map(anecdote => (
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

const mapStateToProps = state => ({
  anecdotes: state.anecdotes
    .filter(
      anecdote => !state.filter || anecdote.content.includes(state.filter)
    )
    .sort((a, b) => b.likes - a.likes),
})

const mapDispatchToProps = {
  addVote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
