import { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import countryService from './services/countryService'

const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [shownCountries, setShownCountries] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
    .getCountries()
    .then(returnedCountries => setAllCountries(returnedCountries))
  }, [])

  const handleSearchChange = (change) => {
    let searchString = change.target.value
    setSearch(searchString)
    
    setShownCountries(
      allCountries
      .filter(country => country.name.common.toLowerCase()
      .includes(searchString.toLowerCase()))
    )
  }

  return (
    <div>
      <h1>Data for countries</h1>
      <Search
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <Countries 
        shownCountries={shownCountries}
        setShownCountries={setShownCountries}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  )
}

export default App;
