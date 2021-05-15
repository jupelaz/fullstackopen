import './App.css'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  const type = {
    INCREMENT: state + 1,
    DECREMENT: state - 1,
    ZERO: 0,
  }
  return type[action] || type['ZERO']
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={_ => store.dispatch({ type: 'INCREMENT' })}>plus</button>
      <button onClick={_ => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={_ => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  )
}

export default App
