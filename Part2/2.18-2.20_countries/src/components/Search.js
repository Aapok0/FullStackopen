const Search = ({search, handleSearchChange}) => {
  return (
    <div>
      Find countries: <input
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default Search