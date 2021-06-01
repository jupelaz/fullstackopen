import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { getBlogs, newBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(
        setNotification(
          { text: `User ${user.username} logged in`, type: 'info' },
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification({ text: 'wrong username or password' }, 5))
    }
  }

  const createBlog = ({ title, author, url }) => {
    try {
      const createdBlog = {
        title,
        author,
        url,
      }
      console.log(newBlog)
      dispatch(newBlog(createdBlog))
      //blogFormRef.current.toggleVisibility()
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    const username = useSelector(state => state.user && state.user.username)
    dispatch(
      setNotification({ text: `User ${username} logged out`, type: 'info' }, 5)
    )
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleLike = blog => {
    dispatch(likeBlog(blog))
  }
  const handleDelete = blog => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      dispatch(deleteBlog(blog))
    }
  }
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  //console.log(blogs)
  const user = useSelector(state => {
    console.log(state)
    return state.user
  })
  console.log('user', user)
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <br />
          <p>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          <br />
          {blogForm()}
        </div>
      )}
      {useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes)).map(
        blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog)}
            handleDelete={() => handleDelete(blog)}
            user={user}
          />
        )
      )}
    </div>
  )
}

export default App
