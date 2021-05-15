const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, { type }) => {
  const types = {
    GOOD: { ...state, good: state.good + 1 },
    OK: { ...state, ok: state.ok + 1 },
    BAD: { ...state, bad: state.bad + 1 },
    ZERO: initialState,
    default: state,
  }
  return types[type] || types['default']
}

export default counterReducer
