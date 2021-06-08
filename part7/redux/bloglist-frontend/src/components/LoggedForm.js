import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { unlogUser } from '../reducers/userReducer'

export const LoggedForm = _ => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
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
    <div>
      <br />
      <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}
