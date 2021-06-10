import React, { useEffect } from 'react'
import { getBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { BlogList } from './BlogList'
import { NewBlog } from './NewBlog'
import { setUser } from '../reducers/userReducer'

export const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
    dispatch(getBlogs())
  }, [])
  return (
    <>
      {useSelector(state => state.user) !== null && <NewBlog />}
      <BlogList />
    </>
  )
}
