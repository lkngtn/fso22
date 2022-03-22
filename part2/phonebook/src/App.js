import { useState, useEffect } from 'react'
import phoneBook from './services/phonebook'

const Filter = ({nameFilter, handleFilterChange}) => {
  return (
    <div>
      filter names: <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  )
}

const Notification = ({ notification }) => {
  if ( notification.message === null) {
    return null
  }
  
  return (
    <div className={`${notification.type} message`}>
      {notification.message}
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
  const [persons, setPersons] = useState([{ name: '', number: '', id: 1 }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notify, setNotify] = useState({message: null, type: null})

  const dismissNotify = (seconds) => {
    setTimeout(() => setNotify({message: null, type:null}), seconds)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const entry = persons.filter(person => person.name === newName)
    if (entry.length === 0) {
      phoneBook
        .create({ 'name': newName, 'number': newNumber })
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotify({message: `Successfully added ${returnedPerson.name}`, type:'success' })
          dismissNotify(5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setNotify({message: `${error.response.data.error}`, type: 'error'})
          dismissNotify(5000)
        })
    } else if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      phoneBook
        .update(entry[0].id, {...entry[0], 'number': newNumber})
        .then(returnedPerson => {
          if (returnedPerson) {
            setPersons(persons.map(person => person.id !== entry[0].id ? person : returnedPerson))
            setNotify({message: `Successfully updated number for ${returnedPerson.name} to ${returnedPerson.number}`, type: 'success'})
            dismissNotify(5000)
          } else {
            setNotify({message: `Cannot update ${newName} because it has been removed from the server`, type: 'error'})
            dismissNotify(5000)
          }
        })
        .catch(error => {
          if (error.response) {
            setNotify({message: `${error.response.data.error}`, type: 'error'})
            dismissNotify(5000)
          }
        })
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
      <Notification notification={notify} />
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