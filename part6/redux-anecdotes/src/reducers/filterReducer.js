const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  const { type, data } = action
  const actions = {
    SET_FILTER: data => data,
    default: _ => state,
  }
  return (actions[type] || actions['default'])(data)
}

export const setFilter = text => ({
  type: 'SET_FILTER',
  data: text,
})
export default filterReducer
