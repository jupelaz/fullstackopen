import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = props => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const getRandomArbitrary = (min, max) =>
    Math.floor(Math.random() * (max - min) + min)
  const handleNext = () => setSelected(getRandomArbitrary(0, 6))
  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = Math.max(...votes)
  const mostVotes = votes.indexOf(maxVotes)

  console.log('votes', votes)
  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]} <br />
        <button onClick={handleVotes}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[mostVotes]} <br />
        <p>has {maxVotes} votes</p>
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
