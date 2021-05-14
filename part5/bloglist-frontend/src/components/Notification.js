import React from 'react'

const Notification = ({ message }) =>
  message && (
    <div className={message.type ? message.type : 'error'}>{message.text}</div>
  )

export default Notification
