import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
export const NewBlog = _ => {
  const dispatch = useDispatch()
  const createBlog = ({ title, author, url }) => {
    try {
      const createdBlog = {
        title,
        author,
        url,
      }
      dispatch(newBlog(createdBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          {
            text: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
            type: 'info',
          },
          5
        )
      )
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification({ text: 'Error creating blog' }, 5))
    }
  }

  const blogFormRef = useRef()

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )
}
