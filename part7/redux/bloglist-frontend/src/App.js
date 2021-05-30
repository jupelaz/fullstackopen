import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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

  const createBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      })
      console.log(newBlog)
      setBlogs([...blogs, newBlog])
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          {
            text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
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
    dispatch(
      setNotification(
        { text: `User ${user.username} logged out`, type: 'info' },
        5
      )
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
    const newBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update(newBlog)

    setBlogs(blogs.filter(blog => blog.id !== newBlog.id).concat(newBlog))
  }
  const handleDelete = blog => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      blogService.drop(blog)
      setBlogs(blogs.filter(filteredBlog => blog.id !== filteredBlog.id))
    }
  }
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  console.log(blogs)

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
            {user.name} logged-in<button onClick={handleLogout}>logout</button>
          </p>
          <br />
          {blogForm()}
        </div>
      )}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog)}
            handleDelete={() => handleDelete(blog)}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
