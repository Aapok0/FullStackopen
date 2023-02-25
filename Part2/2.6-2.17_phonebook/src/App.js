import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      Filter people: <input 
        value={props.filter}
        onChange={props.handleFilterChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input 
        value={props.newName}
        onChange={props.handleNameChange}
        />
      </div>
      <div>
        number: <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({name, number, filter}) => {
  const inPhonebook = () => name.toLowerCase().includes(filter.toLowerCase())

  if (filter.length === 0) return <p>{name} {number}</p>
  else if (inPhonebook() === true) return <p>{name} {number}</p>
}

const Persons = ({persons, filter}) => {
  

  return (
  <div>
    {persons.map((person) => <Person key={person.id} name={person.name} number={person.number} filter={filter} />)}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  /* const [newId, setNewId] = useState(5) */
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (submit) => {
    submit.preventDefault()

    const checkName = persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    )

    if (newName.length === 0 || newNumber.length === 0) return
    if (checkName === true) {
      alert(`${newName} is already added to phonebook.`)
    }
    else {
      const personObject = {
        /* id: newId, */
        name: newName,
        number: newNumber
      }
      
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => setPersons(persons.concat(response.data)))
    }
    
    /* setNewId(newId + 1) */
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (change) => {
    setFilter(change.target.value)
  }

  const handleNameChange = (change) => {
    setNewName(change.target.value)
  }

  const handleNumberChange = (change) => {
    setNewNumber(change.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App