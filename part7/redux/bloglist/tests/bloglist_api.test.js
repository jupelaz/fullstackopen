const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let userObject = {}
  for (user of helper.initialUsers) {
    user.passwordHash = await bcrypt.hash(user.password, 10)
    userObject = new User(user)
    await userObject.save()
  }
  const userForBlogs = await User.findOne({})
  let blogObject = {}
  for (blog of helper.initialBlogs) {
    blog.user = userForBlogs.id
    blogObject = new Blog(blog)
    await blogObject.save()
  }
})
describe('GET blogs', () => {
  test('the application returns the correct amount of blog posts in the JSON format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST blogs', () => {

  test('making an HTTP POST request successfully creates a new blog post', async () => {
    const newBlog = {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    const {body} = await api.post('/api/login').send(helper.initialUsers[0])
    const { token } = body
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'bearer ' + token })
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'React patterns 2',
      author: 'Michael Chan',
      url: 'https://reactpatterns2.com/',
    }
    const { body } = await api.post('/api/login').send(helper.initialUsers[0])
    const { token } = body
    await api.post('/api/blogs').send(newBlog).set({ Authorization: 'bearer ' + token })
    const { body: bodyGet } = await api.get(`/api/blogs/`)
    const { likes } = bodyGet.filter(blog => blog.title === 'React patterns 2')[0]
    expect(likes).toEqual(0)
  })

  test('if title and url are missing from request, responds with status code 400', async () => {
    const newBlog = {
      author: 'Michael Chan',
    }
    const { body } = await api.post('/api/login').send(helper.initialUsers[0])
    const { token } = body
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'bearer ' + token })
      .expect(400)
  })

  test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
      title: 'React patterns 3',
      author: 'Michael Chan',
      url: 'https://reactpatterns3.com/',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
