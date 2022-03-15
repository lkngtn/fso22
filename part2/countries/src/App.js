import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({nameFilter, handleFilterChange}) => {
  return (
    <div>
      filter names: <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  )
}

const Countries = ({countries, nameFilter}) => {
  const inFilter = (country) => {
    return nameFilter === '' ? true : country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
  }
  let filteredCountries = countries.filter(inFilter)
  if (filteredCountries.length === 1) {
    let country = filteredCountries[0]
    return (
      <div>
        <h3> {country.name.common} {country.flag} </h3>
        <p>Capital: {country.capital} </p>
        <p>Area: {country.area} </p>
        <h4>Languages</h4>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
      </div>
    )
  } else {
    return filteredCountries.map(country => <p key={country.name.official}>{country.name.common}</p>)
  }
}

const App = () => {
  const [countries, setCountries] = useState([
  ])

  const [nameFilter, setNameFilter] = useState('')
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  useEffect(() => {
    // https://restcountries.com/v3.1/all
    // http://localhost:3001/countries
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Search Countries</h2>
      <Filter handleFilterChange={handleFilterChange} nameFilter={nameFilter} />
      <Countries countries={countries} nameFilter={nameFilter} />
    </div>
  )
}

export default App