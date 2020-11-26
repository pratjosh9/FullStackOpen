import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

function Filter({text, handleChange}) {
  return (
    <div>
      find countries <input value={text} onChange={handleChange} />
    </div>
  )
}

function App() {

  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countryList = country.length === 0 ? [] : 
                        countries.filter((curCountry) => 
                          curCountry.name.toLowerCase().includes(country.toLowerCase())
                        )

  return (
    <div>
      <Filter text = {country} handleChange = {handleCountryChange} />
      <CountryList list = {countryList} />
    </div>
  )
}

export default App;
