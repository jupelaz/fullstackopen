import React from 'react'
import { Users } from './components/Users'
import { User } from './components/User'
import { Home } from './components/Home'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Notification from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { LoggedForm } from './components/LoggedForm'
import { useSelector } from 'react-redux'
import { BlogView } from './components/BlogView'

const App = () => {
  return (
    <Router>
      <h2>blogs</h2>
      <Notification />
      {useSelector(state => state.user) === null ? (
        <LoginForm />
      ) : (
        <LoggedForm />
      )}
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <BlogView />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
