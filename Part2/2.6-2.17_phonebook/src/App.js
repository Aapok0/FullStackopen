import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({id, name, number, filter, removePerson}) => {
  const inPhonebook = () => name.toLowerCase().includes(filter.toLowerCase())

  if (filter.length !== 0 && inPhonebook() === false) return;
  
  return (
    <>
      <p>
        {name} {number}&nbsp;
        <button onClick={() => removePerson(id, name)}>delete</button>
      </p>
    </>
  )
}

const Persons = ({persons, filter, removePerson}) => {
  return (
  <div>
    {persons.map((person) => 
      <Person
      key={person.id}
      id={person.id}
      name={person.name}
      number={person.number}
      filter={filter}
      removePerson={removePerson}
      />
    )}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (submit) => {
    submit.preventDefault()

    const checkName = persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    )

    if (newName.length === 0 || newNumber.length === 0) return;
    if (checkName === true) {
      alert(`${newName} is already added to phonebook.`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
    }
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
      <Persons
        persons={persons}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App