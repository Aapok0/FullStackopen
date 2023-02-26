import { useState, useEffect } from 'react'
import personService from './services/persons'

/* A component, that renders a search field for the user to filter the list of numbers.
    - input value tied to the filter state
    - input change triggers a handler that updates the state */
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

/* A component, that renders a form to add a new person to the phonebook.
    - the two input values are tied to newName and newNumber states
    - input changes trigger handlers that update the states
    - button's submit event triggers a handler */
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

/* A component to render the person objects with a delete button according to the filter value.
    - does not render, if filter value has characters and string does not exist in the person's name
    - delete button calls handler function to remove the person object from database */
const Person = ({id, name, number, filter, removePerson}) => {
  const inPhonebook = () => name.toLowerCase().includes(filter.toLowerCase()) // checks, if string exists in any case

  if (filter.length !== 0 && inPhonebook() === false) return;

  return (
    <div>
      {name} {number}&nbsp;
      <button onClick={() => removePerson(id, name)}>delete</button>
    </div>
  )
}

/* A component to go through array of person objects gotten from database.
    - map method calls person component on all person objects
    - passes prop information gotten from app component */
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

/* Main app component
    - sets state variables and update functions for them
    - holds callback handlers
    - calls components to render the app */
const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => { // as a side effect of initial render, get all service fetches person objects from database to persons array
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, []) // [] = this callback is called only after first render of page

  const addPerson = (submit) => { // callback for the form's submit button
    submit.preventDefault() // prevents default behavior

    let emptyMessage = 'Insufficient information. Name or number field empty. Fill all fields.'
    let updateMessage = `${newName} is already added to phonebook. Do you want to replace the old number with a new one?`
    
    const personObject = { // new object to add to the persons array
        name: newName,
        number: newNumber
    }
    const checkNameObject = persons // tries to find, if a person object exists with same name and returns it (not case sensitive)
      .find(person => 
        person.name.toLowerCase() === newName.toLowerCase())

    if (newName.length === 0 || newNumber.length === 0) return alert(emptyMessage); // won't let you add person with empty name or number
    if (checkNameObject !== undefined) { // name check returns undefined, if the name doesn't exist in the array -> just update number, if not undefined
      if (window.confirm(updateMessage)) { // confirms, if user really wants update number
        personService
          .update(checkNameObject.id, personObject) // update service, that uses axios
          .then(returnedPerson => { // updates numbers on site without refreshing the page
            setPersons(persons
              .map(person => person.id !== returnedPerson.id
                ? person
                : returnedPerson))
          })
      }
    }
    else {
      personService
        .create(personObject) // create service that uses axios
        .then(returnedPerson => { // updates numbers on site without refreshing the page
          setPersons(persons.concat(returnedPerson))
        })
    }
    // sets input fields back to empty
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id, name) => { // callback for the delete buttons next to numbers
    if (window.confirm(`Delete ${name}?`)) { // confirms, if user really wants to delete number
      personService
        .remove(id) // remove service that uses axios
        .then(setPersons(persons.filter((person) => person.id !== id))) // // updates numbers on site without refreshing the page
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
      <Persons
        persons={persons}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App