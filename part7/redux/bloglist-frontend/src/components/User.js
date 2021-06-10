import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getUsers } from '../reducers/usersReducer.js'

export const User = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))
  useEffect(() => {
    dispatch(getUsers())
  }, [])
  console.log(user)
  if (!user) return null
  return (
    user && (
      <>
        <h2>{user.name}</h2>
        <b>added blogs</b>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </>
    )
  )
}
