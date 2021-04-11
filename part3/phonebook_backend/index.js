const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><br /><p>${Date()}</p>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(409).json({
      error: 'name must be unique',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: getRandomInt(1, 200),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  const foundPerson = persons.find(person => person.id === id)
  if (foundPerson) {
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
