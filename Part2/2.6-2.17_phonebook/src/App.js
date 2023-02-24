import { useState } from 'react'

const Person = ({name, number}) => <p>{name} {number}</p>

const Persons = ({persons}) => {
  return (
  <div>
    {persons.map((person) => <Person key={person.id} name={person.name} number={person.number} />)}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {id: 1, name: 'Arto Hellas', number: '066 0828932'},
    {id: 2, name: 'Matti Meikäläinen', number: '098 6754852'}
  ])
  const [newId, setNewId] = useState(3)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
        id: newId,
        name: newName,
        number: newNumber
      }
    
      setPersons(persons.concat(personObject))
    }
    
    setNewId(newId + 1)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (change) => {
    setNewName(change.target.value)
  }

  const handleNumberChange = (change) => {
    setNewNumber(change.target.value)
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
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
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