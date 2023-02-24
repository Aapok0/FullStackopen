import { useState } from 'react'

const Person = ({name}) => <p>{name}</p>

const Persons = ({persons}) => {
  return (
  <div>
    {persons.map((person) => <Person key={person.id} name={person.name} />)}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newId, setNewId] = useState(2)

  const addPerson = (submit) => {
    submit.preventDefault()
    
    const checkName = persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    )

    if (newName.length === 0) {return;}
    if (checkName === true) {
      alert(`${newName} is already added to phonebook.`)
    }
    else {
      const personObject = {
        id: newId,
        name: newName
      }
    
      setPersons(persons.concat(personObject))
    }
    
    setNewId(newId + 1)
    setNewName('')
  }

  const handleNameChange = (change) => {
    setNewName(change.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App