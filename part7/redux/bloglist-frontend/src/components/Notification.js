import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react'
import { deleteNotification } from '../reducers/notificationReducer'
export const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const handleClose = () => {
    dispatch(deleteNotification())
  }
  return (
    <>
      {notification && (
        <Alert status={notification.type ? notification.type : 'error'}>
          <AlertIcon />
          {notification.text}
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={handleClose}
          />
        </Alert>
      )}
    </>
  )
}
