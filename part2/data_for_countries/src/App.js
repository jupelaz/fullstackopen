import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    <ul>
      {country.languages.map(language => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
    <br />
    <img
      src={country.flag}
      style={{ width: '100px', heigth: '100px' }}
      alt={`flag of ${country.name}`}
    />
    <Weather countryName={country.name} />
  </div>
)

const Weather = ({ countryName }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})
  useEffect(
    () =>
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`
        )
        .then(({ data }) => setWeather(data.current)),
    [countryName, api_key]
  )
  console.log(weather)
  return (
    <div>
      <h3>Weather in {countryName}</h3>
      <p>
        <b>temperature: </b> {weather.temperature} Celsius
      </p>
      {weather.weather_icons.map(icon => (
        <img
          key={icon}
          src={icon}
          style={{ width: '10px', heigth: '10px' }}
          alt={`icon of weather}`}
        />
      ))}
      <p>
        <b>wind: </b> {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  )
}
function App() {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(({ data }) => {
      //console.log(data)
      setCountries(data)
    })
  }, [])

  let foundCountries =
    countries.length === 0
      ? []
      : countries.filter(country => country.name.search(input) !== -1)
  const handleInputChange = event => setInput(event.target.value)
  const handleClickCountry = countryName => () => setInput(countryName)
  //console.log(foundCountries)
  return (
    <>
      <p>
        find countries
        <input value={input} onChange={handleInputChange} />
      </p>
      {foundCountries.length > 10 ? (
        <p>Too many countries, specify another filter</p>
      ) : foundCountries.length === 1 ? (
        <Country country={foundCountries[0]} />
      ) : (
        foundCountries.map(country => (
          <p key={country.name}>
            {country.name}
            <button
              value={country.name}
              onClick={handleClickCountry(country.name)}
            >
              show
            </button>
          </p>
        ))
      )}
    </>
  )
}

export default App
