import axios from 'axios'

const getCountries = () => {
  const countryAPI = 'https://restcountries.com/v3.1/all'

  const request = axios.get(countryAPI)
  return request.then(response => response.data)
}

export default {getCountries}