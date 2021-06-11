const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user')
  console.log(blogs)
  response.json(blogs)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { body, token, params } = request
  const { comment } = body

  if (!token) {
    return response.status(401).json({ error: 'missing token' })
  }
  const blog = await Blog.findById(params.id)
  if (!blog) {
    return response.status(401).json({ error: 'blog not found' })
  }
  const { title, author, url, likes } = blog
  console.log(comment)
  const comments = blog.comments.concat(comment)
  const updatedBlog = {
    title,
    author,
    url,
    likes,
    comments,
  }
  console.log(updatedBlog)
  const newBlog = await Blog.findByIdAndUpdate(params.id, updatedBlog, {
    new: true,
  })
  response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
  const { body, user, token } = request
  const { title, author, url, likes, comments } = body
  if (!token) {
    return response.status(401).json({ error: 'missing token' })
  }

  const tokenUser = await User.findById(user)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: tokenUser._id,
    comments,
  })
  const savedBlog = await blog.save()
  tokenUser.blogs = tokenUser.blogs.concat(savedBlog._id)
  await tokenUser.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { user, params } = request
  const blog = await Blog.findById(params.id)
  if (!blog) {
    return response.status(401).json({ error: 'blog not found' })
  }

  if (user.toString() !== blog.user.toString()) {
    return response
      .status(401)
      .json({ error: 'only author can delete the blog' })
  }
  await Blog.findByIdAndRemove(params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { body, token, params } = request
  const { title, author, url, likes, user, comments } = body
  const { id: userId } = user
  if (!token) {
    return response.status(401).json({ error: 'missing token' })
  }
  const blog = await Blog.findById(params.id)
  if (!blog) {
    return response.status(401).json({ error: 'blog not found' })
  }

  const updatedBlog = {
    id: params.id,
    title,
    author,
    url,
    likes,
    user: userId,
    comments,
  }
  const newBlog = await Blog.findByIdAndUpdate(params.id, updatedBlog, {
    new: true,
  })
  response.status(204).end()
})

module.exports = blogsRouter
