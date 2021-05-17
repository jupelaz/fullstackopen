const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const { type, data } = action
  const actions = {
    SET_NOTIFICATION: data => data,
    DELETE_NOTIFICATION: _ => null,
    default: _ => state,
  }
  return (actions[type] || actions['default'])(data)
}

export const setNotification = (text, time) => async dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: text,
  })
  setTimeout(() => {
    dispatch({
      type: 'DELETE_NOTIFICATION',
      data: text,
    })
  }, time * 1000)
}

export default notificationReducer
