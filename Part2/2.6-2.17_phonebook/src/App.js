import { useState, useEffect } from 'react'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/personService'

/* Main app component
    - sets state variables and update functions for them
    - holds callback handlers
    - calls components to render the app */
const App = () => {
  const [people, setPeople] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('default')

  useEffect(() => { // as a side effect of initial render, fetches person objects from database to people array
    personService
      .getAll()
      .then(initialPeople => setPeople(initialPeople))
  }, []) // [] = this callback is called only after first render of page

  const addPerson = (submit) => { // callback for the form's submit button
    submit.preventDefault() // prevents default behavior

    let emptyMessage = 'Insufficient information. Name or number field empty. Fill all fields.'
    let updateMessage = `${newName} is already in the phonebook. Do you want to replace the old number with a new one?`
    
    const personObject = { // new object to add to the people array
      name: newName,
      number: newNumber
    }
    const checkNameObject = people // tries to find, if a person object exists with same name and returns it (not case sensitive)
      .find(person => 
        person.name.toLowerCase() === newName.toLowerCase())

    if (newName.length === 0 || newNumber.length === 0) return alert(emptyMessage); // won't let you add person with empty name or number

    if (checkNameObject === undefined) { // name check returns undefined, if the name doesn't exist in the array
      personService
        .create(personObject) // create service that uses axios
        .then(returnedPerson => { // updates numbers on site without refreshing the page
          setPeople(people.concat(returnedPerson))
          setMessage(`${returnedPerson.name} was added to the phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 6000)
        })
        .catch(error => { // catches error and shows its message to user
          setMessageType('error')
          setMessage(error.message)
          setTimeout(() => {
            setMessageType('default')
            setMessage(null)
          }, 10000)
        })
    }
    else { // just update the number, if person is already in the phonebook
      if (window.confirm(updateMessage)) { // confirms, if user really wants to update number
        personService
          .update(checkNameObject.id, personObject) // update service, that uses axios
          .then(returnedPerson => { // updates numbers on site without refreshing the page
            setPeople(people
              .map(person => person.id !== returnedPerson.id
                ? person
                : returnedPerson))
            setMessage(`Changed ${returnedPerson.name}'s number to ${returnedPerson.number}`)
            setTimeout(() => {
              setMessage(null)
            }, 6000)
          
          })
          .catch(error => { // catches error and shows its message to user
            setMessageType('error')
            if (error.response.status === 404) { // unique message to 404
              setMessage(`${error.message}: ${personObject.name} has already been removed from the phonebook`)
            }
            else {
              setMessage(error.message)
            }
            setTimeout(() => {
              setMessageType('default')
              setMessage(null)
            }, 10000)
      })}
    }
    // sets input fields back to empty
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id, name) => { // callback for the delete buttons next to numbers
    if (window.confirm(`Delete ${name}?`)) { // confirms, if user really wants to delete number
      personService
        .remove(id) // remove service that uses axios
        .then(setPeople(people.filter((person) => person.id !== id))) // updates numbers on site without refreshing the page
        .then(setMessage(`${name} was removed from the phonebook`))
        .then(
          setTimeout(() => {
            setMessage(null)
          }, 6000)
        )
        .catch(error => { // catches error and shows its message to user
          setMessageType('error')
          setMessage(error.message)
          setTimeout(() => {
            setMessageType('default')
            setMessage(null)
          }, 10000)
        })
    }
  }

  // callback handlers to state variables to keep them up to date with any changes in the input fields
  const handleFilterChange = (change) => {
    setFilter(change.target.value)
  }
  const handleNameChange = (change) => {
    setNewName(change.target.value)
  }
  const handleNumberChange = (change) => {
    setNewNumber(change.target.value)
  }

  return ( // app components and headings to be rendered in the browser
    <div>
      <h1>Phonebook</h1>
      <Notification 
        message={message}
        messageType={messageType}
      />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new number</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <People
        people={people}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App