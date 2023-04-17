import axios from 'axios'

const getWeather = (latitude, longitude) => {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&"
  const apiKey = process.env.REACT_APP_API_KEY_WEATHER
  const weatherAPI = baseUrl + "&lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey

  const request = axios.get(weatherAPI)
  return request.then(response => response.data)
}

export default {getWeather}