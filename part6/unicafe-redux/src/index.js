import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleGood = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }
  const handleOk = () => {
    store.dispatch({
      type: 'OK',
    })
  }
  const handleBad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }
  const handleReset = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }
  const { good, bad, ok } = store.getState()
  const total = good + bad + ok
  const avg = (good - bad) / total
  const positive = (good * 100) / total + ' %'
  return (
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleReset}>reset stats</button>
      <div>good {good}</div>
      <div>neutral {ok}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <div>average {avg}</div>
      <div>positive {positive}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
