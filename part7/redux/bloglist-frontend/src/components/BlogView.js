import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getBlogs, likeBlog } from '../reducers/blogReducer.js'

export const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(user => user.id === id))
  useEffect(() => {
    dispatch(getBlogs())
  }, [])
  console.log(blog)
  if (!blog) return null
  const handleLike = _ => {
    console.log('handleLike blog', blog)
    dispatch(likeBlog(blog))
  }
  return (
    <>
      <h2>{blog.title}</h2>
      <b>{blog.url}</b>
      <p>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.author}</p>
    </>
  )
}
