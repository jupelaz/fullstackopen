import anecdoteService from '../services/anecdotes'

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
    CREATE_ANECDOTE: content => [...state, content],
    default: _ => state,
  }
  return (actions[type] || actions['default'])(data)
}

export const addVote = id => async dispatch => {
  const oneToUpdate = await anecdoteService.getOne(id)
  await anecdoteService.updateOne(id, {
    ...oneToUpdate,
    votes: oneToUpdate.votes + 1,
  })
  dispatch({ type: 'VOTE_ANECDOTE', data: id })
}

export const newAnecdote = content => async dispatch => {
  const data = await anecdoteService.createNew(content)
  dispatch({
    type: 'CREATE_ANECDOTE',
    data,
  })
}

export const initializeAnecdotes = _ => async dispatch => {
  const data = await anecdoteService.getAll()
  dispatch({ type: 'INIT_ANECDOTES', data })
}

export default anecdoteReducer
