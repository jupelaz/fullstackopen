const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body, user, token } = request
  const { title, author, url, likes } = body
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
  const { params, body } = request
  const { title, author, url, likes, user } = body

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
    user,
  }
  await Blog.findByIdAndUpdate(params.id, updatedBlog, { new: true })
  response.status(204).end()
})

module.exports = blogsRouter
