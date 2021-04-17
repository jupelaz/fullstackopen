import { useState, useEffect } from 'react'
import personService from './services/person'
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

const Persons = ({ persons, setPersons, setMessage, filter }) => {
  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.drop(person.id).then(_ => {
        setPersons(
          persons.filter(filteredPerson => filteredPerson.id !== person.id)
        )
        setMessage({ text: `Deleted ${person.name}`, type: 'info' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }
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
            {person.name} {person.number}{' '}
            <button onClick={() => handleDelete(person)}>delete</button>
          </p>
        ))}
    </>
  )
}

const Notification = ({ message }) => (
  <>
    {message && <div className={`${message.type} message`}>{message.text}</div>}
  </>
)
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState(null)
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()
    const personFound = persons.find(person => person.name === newName)
    if (personFound) {
      if (
        window.confirm(
          `${personFound.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personFound.id, { ...personFound, number: newNumber })
          .then(updatedPerson => {
            setPersons(
              persons.map(mappedPerson =>
                mappedPerson.id === updatedPerson.id
                  ? updatedPerson
                  : mappedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            setMessage({ text: `Updated ${updatedPerson.name}`, type: 'info' })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage({
              text: `Information of ${personFound.name} has already been removed from server`,
              type: 'error',
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage({ text: `Added ${returnedPerson.name}`, type: 'info' })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage({
            text: error.response.data.error,
            type: 'error',
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons
        filter={filter}
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  )
}

export default App
