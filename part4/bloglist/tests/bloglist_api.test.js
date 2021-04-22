const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = {}
  for (blog of helper.initialBlogs) {
    noteObject = new Blog(blog)
    await noteObject.save()
  }
})

test('the application returns the correct amount of blog posts in the JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get()

  expect(response).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body[0])
  expect(response.body[0].id).toBeDefined()
})

test('making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
  const newBlog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  await api.post('/api/blogs').send(newBlog)
  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('if the likes property is missing from the request, it will default to the value 0', async () =>{
  const newBlog = {
    title: 'React patterns 2',
    author: 'Michael Chan',
    url: 'https://reactpatterns2.com/',
  }
  await api.post('/api/blogs').send(newBlog)
  const {body} = await api.get(`/api/blogs/`)
  const {likes} = body.filter(blog => blog.title === 'React patterns 2')[0]
  expect(likes).toEqual(0)
})

test('if title and url are missing from request, responds with status code 400', async () => {
  const newBlog = {
    author: 'Michael Chan',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})
afterAll(() => {
  mongoose.connection.close()
})
