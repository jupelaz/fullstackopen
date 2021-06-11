import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getBlogs, likeBlog, addComment } from '../reducers/blogReducer.js'

export const Blog = () => {
  const [comment, setComment] = useState('')
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

  const handleAddComment = event => {
    event.preventDefault()
    const comments = blog.comments.concat(comment)
    dispatch(addComment({ ...blog, comments }))
    setComment('')
  }
  return (
    <>
      <h2>{blog.title}</h2>
      <b>{blog.url}</b>
      <p>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <b>comments</b>
      <form onSubmit={handleAddComment}>
        <input
          type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>add comment</button>
      </form>
      {blog.comments && (
        <>
          <ul>
            {blog.comments.map(comment => (
              <li>{comment}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
