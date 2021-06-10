const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3)
    return response.status(400).send({ error: 'password not valid' })
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const { token, params } = request
  const { id } = params
  if (!token) {
    return response.status(401).json({ error: 'missing token' })
  }
  const user = await User.findById(id).populate('blogs')
  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  }
  response.json(user)
})

module.exports = usersRouter
