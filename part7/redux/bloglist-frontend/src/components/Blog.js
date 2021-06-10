import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
const Blog = ({ blog }) => {
  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog
