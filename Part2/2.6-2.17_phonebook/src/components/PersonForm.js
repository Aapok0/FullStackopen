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

export default PersonForm