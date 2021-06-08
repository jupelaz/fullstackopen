import { Users } from './components/Users'
import { Home } from './components/Home'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import Notification from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { LoggedForm } from './components/LoggedForm'
import { useSelector } from 'react-redux'

const App = () => (
  <Router>
    <h2>blogs</h2>
    <Notification />
    {useSelector(state => state.user) === null ? <LoginForm /> : <LoggedForm />}
    <Switch>
      <Route path='/users'>
        <Users />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  </Router>
)

export default App
