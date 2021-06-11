import React from 'react'
import { Users } from './components/Users'
import { User } from './components/User'
import { Home } from './components/Home'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Notification } from './components/Notification'
import { Navigation } from './components/Navigation'
import { LoginForm } from './components/LoginForm'
import { useSelector } from 'react-redux'
import { Blog } from './components/Blog'

const App = () => {
  const user = useSelector(state => state.user)
  return (
    <Router>
      <Navigation />
      <Notification />
      {!user && <LoginForm />}
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/blogs'>
          <Home />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
