import { useState, useEffect } from 'react'
import axios from 'axios'

const Data = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={country.flags.alt} height="100"></img>
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Area:</b> {country.area} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}>{language}</li>
        )}
      </ul>
    </div>
  )
}

const Country = ({name}) => {
  return <p>{name}</p>
}

const Countries = ({shownCountries}) => {
  if (shownCountries === null) return null
  if (shownCountries.length < 1) return null
  else if (shownCountries.length > 10) {
    return (
      <p>Too many matches. Specify your search further.</p>
    )
  }
  else if (shownCountries.length > 1) {
    return (
      <div>
        {shownCountries.map(country =>
          <Country
            key={country.ccn3}
            name={country.name.common}
          />
        )}
      </div>
    )
  }
  else {
    return <Data country={shownCountries[0]}/>
  }
}

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

const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [shownCountries, setShownCountries] = useState(null)

  useEffect(() => {
    getCountries()
    .then(returnedCountries => setAllCountries(returnedCountries))
  }, [])

  const getCountries = () => {
    const baseUrl = 'https://restcountries.com/v3.1/all'

    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const handleSearchChange = (change) => {
    setSearch(change.target.value)

    setShownCountries(
      allCountries
      .filter(country => country.name.common.toLowerCase()
      .includes(search.toLowerCase()))
    )
  }

  return (
    <div>
      <h1>Data for countries</h1>
      <Search
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <Countries shownCountries={shownCountries}/>
    </div>
  )
}

export default App;
