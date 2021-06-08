import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)
  const removeVisible = {
    display: user && user.username === blog.user.username ? '' : 'none',
  }
  const handleLike = _ => {
    dispatch(likeBlog(blog))
  }
  const handleDelete = _ => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      dispatch(deleteBlog(blog))
    }
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div style={showWhenVisible}>
          {blog.url}
          <br />
          <p>likes {blog.likes}</p> <button onClick={handleLike}>like</button>
          <br />
          {blog.user.name}
          <br />
          <button style={removeVisible} onClick={handleDelete}>
            remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
