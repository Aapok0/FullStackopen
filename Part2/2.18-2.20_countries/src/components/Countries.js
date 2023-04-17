import Data from "./Data"
import Weather from "./Weather"

const Country = ({country, setShownCountries}) => {
  return (
    <p>
      {country.name.common}
      <button onClick={() => setShownCountries([country])}>show</button>
    </p>
  )
}

const Countries = ({shownCountries, setShownCountries, weather, setWeather, getWeather}) => {
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
            country={country}
            setShownCountries={setShownCountries}
          />
        )}
      </div>
    )
  }
  else {
    return (
      <div>
        <Data country={shownCountries[0]}/>
        <Weather 
          country={shownCountries[0]}
          weather={weather}
          setWeather={setWeather}
          getWeather={getWeather}
        />
      </div>
    )
  }
}

export default Countries