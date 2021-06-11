import userService from '../services/users'

const usersReducer = (state = [], action) => {
  console.log('state now:', state)
  console.log('action:', action)
  const { type, data } = action

  const actions = {
    GET_USERS: _ => data,
    default: _ => state,
  }
  return (actions[type] || actions['default'])(data)
}

export const getUsers = _ => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: data,
    })
  }
}

export const getUser = id => {}

export default usersReducer
