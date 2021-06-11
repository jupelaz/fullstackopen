import React from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
export const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return useSelector(state =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  ).map(blog => (
    <div key={blog.id} style={blogStyle} className='blog'>
      <Link as={RouterLink} color='teal.500' to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  ))
}
