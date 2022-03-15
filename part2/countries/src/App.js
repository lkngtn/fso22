import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({nameFilter, handleFilterChange}) => {
  return (
    <div>
      filter names: <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState({fetched: false})
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`).then(response => {
      setWeather({success: true, temp: response.data.main.temp, icon: response.data.weather[0].icon, wind: response.data.wind.speed})
    })
  },[country])
  return weather.fetched ? 
    (
      <>
        <h3>Weather in {country.capital}</h3>
        <p>Temperature: {weather.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon" />
        <p>wind speed: {weather.wind} m/s </p>
      </>
    )
  : <></> 
}

const Country = ({country}) => {
 
  return (
    <div>
      <h3> {country.name.common} {country.flag} </h3>
      <p>Capital: {country.capital} </p>
      <p>Area: {country.area} </p>
      <h4>Languages</h4>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <Weather country={country} />
    </div>
  )
}

const Countries = ({countries, nameFilter, setNameFilter}) => {
  const inFilter = (country) => {
    return nameFilter === '' ? true : country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
  }

  let filteredCountries = countries.filter(inFilter)
  if (filteredCountries.length === 1) {
    let country = filteredCountries[0]
    return (
      <Country country={country}/>
    )
  } else {
    return filteredCountries.map(country => <p key={country.name.official}>{country.name.common}<button onClick={() => setNameFilter(country.name.common)}>Select</button></p>)
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => setNameFilter(event.target.value)

  return (
    <div>
      <h2>Search Countries</h2>
      <Filter handleFilterChange={handleFilterChange} nameFilter={nameFilter} />
      <Countries countries={countries} weather={weather} setWeather={setWeather} nameFilter={nameFilter} setNameFilter={setNameFilter} />
    </div>
  )
}

export default App