import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    notification && (
      <div className={notification.type ? notification.type : 'error'}>
        {notification.text}
      </div>
    )
  )
}
export default Notification
