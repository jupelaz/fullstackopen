import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(
        setNotification(
          { text: `User ${user.username} logged in`, type: 'info' },
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification({ text: 'wrong username or password' }, 5))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <FormControl id='username'>
        <FormLabel>Username</FormLabel>
        <Input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </FormControl>
      <FormControl id='password'>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </FormControl>
      <Button margin='.5em' type='submit'>
        login
      </Button>
    </form>
  )
}
