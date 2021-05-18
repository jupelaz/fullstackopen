const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const { type, data } = action

  const actions = {
    SET_NOTIFICATION: data => {
      if (state && state.timeoutId) clearTimeout(state.timeoutId)
      return data
    },
    DELETE_NOTIFICATION: _ => null,
    default: _ => state,
  }
  return (actions[type] || actions['default'])(data)
}

export const setNotification = (text, time) => async dispatch => {
  const timeoutId = setTimeout(() => {
    dispatch({
      type: 'DELETE_NOTIFICATION',
    })
  }, time * 1000)
  dispatch({
    type: 'SET_NOTIFICATION',
    data: { text, timeoutId },
  })
}

export default notificationReducer
