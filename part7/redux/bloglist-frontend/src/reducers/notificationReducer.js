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

export const setNotification = (notification, time) => async dispatch => {
  const timeoutId = setTimeout(() => {
    dispatch({
      type: 'DELETE_NOTIFICATION',
    })
  }, time * 1000)
  const { text, type } = notification
  dispatch({
    type: 'SET_NOTIFICATION',
    data: { text, type, timeoutId },
  })
}

export const deleteNotification = () => {
  return { type: 'DELETE_NOTIFICATION' }
}

export default notificationReducer
