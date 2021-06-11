import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { unlogUser } from '../reducers/userReducer'

export const Navigation = () => {
  const backGrey = {
    backgroundColor: 'lightgrey',
  }
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const padding = { padding: 5 }
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
    <div style={backGrey}>
      <Link style={padding} to='/blogs'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user && `${user.name} logged-in `}
      {user && <button onClick={handleLogout}>logout</button>}
    </div>
  )
}
