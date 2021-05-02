import { useState } from 'react'
const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)
  const removeVisible = {
    display: user && user.username === blog.user.username ? '' : 'none',
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        {blog.user.name}
        <br />
        <button style={removeVisible} onClick={handleDelete}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {}
export default Blog
