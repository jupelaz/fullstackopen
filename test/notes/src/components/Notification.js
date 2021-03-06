import React from 'react'

const Notification = ({ message }) =>
  message && <div className='error'>{message}</div>

export default Notification
