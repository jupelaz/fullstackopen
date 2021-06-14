import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { unlogUser } from '../reducers/userReducer'
import { Box, Link, Button } from '@chakra-ui/react'

export const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    dispatch(unlogUser())
    dispatch(
      setNotification(
        { text: `User ${user.username} logged out`, type: 'info' },
        5
      )
    )
  }
  return (
    <Box bg='lightgray' padding='.5em'>
      <Link as={RouterLink} color='teal' margin='.5em' to='/blogs'>
        blogs
      </Link>
      <Link as={RouterLink} color='teal' margin='5' to='/users'>
        users
      </Link>
      {user && `${user.name} logged-in `}
      {user && <Button onClick={handleLogout}>logout</Button>}
    </Box>
  )
}
