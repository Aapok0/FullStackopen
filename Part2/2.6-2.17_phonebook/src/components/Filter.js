/* A component, that renders a search field for the user to filter the list of numbers.
    - input value tied to the filter state
    - input change triggers a handler that updates the state */
const Filter = ({filter, handleFilterChange}) => {
	return (
		<div>
			Filter people: <input 
				value={filter}
				onChange={handleFilterChange}
			/>
		</div>
	)
}
export default Filter