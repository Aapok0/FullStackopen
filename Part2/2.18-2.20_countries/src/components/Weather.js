import { useEffect } from 'react'
import weatherService from '../services/weatherService'

const Weather = ({country, weather, setWeather}) => {
  let latitude = country.capitalInfo.latlng[0]
  let longitude = country.capitalInfo.latlng[1]

  useEffect(() => {
    weatherService
    .getWeather(latitude, longitude)
    .then(returnedWeather => setWeather(returnedWeather))
  }, [])

  if (weather === null) return <p>Unable to get weather right now.</p>
  else {
    let icon = weather.weather[0].icon
    let description = weather.weather[0].description
    let weatherIcon = "https://openweathermap.org/img/wn/" + icon + ".png"
  
    return(
      <div>
        <h3>Weather in {country.capital} </h3>
        <img src={weatherIcon} alt={description}></img>
        <p>{description}</p>
        <p>Temperature: {weather.main.temp} °C</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }
  
}

export default Weather