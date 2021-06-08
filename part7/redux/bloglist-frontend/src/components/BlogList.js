import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
export const BlogList = () =>
  useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes)).map(
    blog => <Blog key={blog.id} blog={blog} />
  )
