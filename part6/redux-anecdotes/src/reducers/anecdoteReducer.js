const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const { type, data } = action
  const actions = {
    VOTE_ANECDOTE: id => {
      return state.map(anecdote =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },
    INIT_ANECDOTES: data => data,
    CREATE_ANECDOTE: content => [...state, asObject(content)],
    default: _ => state,
  }
  return (actions[type] || actions['default'])(data)
}

export const addVote = id => ({ type: 'VOTE_ANECDOTE', data: id })
export const newAnecdote = data => ({
  type: 'CREATE_ANECDOTE',
  data,
})
export const initialize = data => ({ type: 'INIT_ANECDOTES', data })
export default anecdoteReducer
