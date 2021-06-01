import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const { type, data } = action

  const actions = {
    SET_USER: _ => data,
    DELETE_USER: _ => null,
    default: _ => state,
  }
  return (actions[type] || actions['default'])(data)
}

export const setUser = user => async dispatch => {
  blogService.setToken(user.token)
  dispatch({
    type: 'SET_USER',
    data: user,
  })
}

export default userReducer
