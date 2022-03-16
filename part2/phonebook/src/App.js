import { useState, useEffect } from 'react'
import phoneBook from './services/phonebook'

const Filter = ({nameFilter, handleFilterChange}) => {
  return (
    <div>
      filter names: <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
} 

const Persons = ({persons, nameFilter, removeName}) => {
  const inFilter = (person) => {
    return nameFilter === '' ? true : person.name.toLowerCase().includes(nameFilter.toLowerCase())
  }
  return persons.filter(inFilter).map(person => <p key={person.id}>{person.name}: {person.number} <button onClick={() => removeName(person.id)}>Delete</button> </p>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      const newPerson = { 'name': newName, 'number': newNumber }
      phoneBook
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
  }

  const removeName = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      phoneBook
        .destroy(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }     
  }

  useEffect(() => {
    phoneBook.getAll().then(entries => {
      setPersons(entries)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} nameFilter={nameFilter} />

      <h3>add new</h3>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} removeName={removeName} />
    </div>
  )
}

export default App