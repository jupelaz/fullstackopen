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

export const addNotification = text => ({
  type: 'SET_NOTIFICATION',
  data: text,
})
export const deleteNotification = _ => ({ type: 'DELETE_NOTIFICATION' })
export default notificationReducer
