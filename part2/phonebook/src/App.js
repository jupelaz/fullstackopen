import React, { useState } from 'react'

const Filter = ({ filter, onChange }) => (
  <div>
    filter shown with
    <input value={filter} onChange={onChange} />
  </div>
)

const PersonForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons
        .filter(person => {
          const retorno =
            filter === '' ||
            person.name.toLowerCase().search(filter.toLowerCase()) !== -1
          return retorno
        })
        .map(person => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, { name: newName, number: newNumber }])
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App
