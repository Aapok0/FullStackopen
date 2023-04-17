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
const People = ({people, filter, removePerson}) => {
	return (
		<div>
			{people.map((person) => 
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

export default People