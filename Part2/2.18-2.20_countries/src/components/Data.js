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

export default Data