import React from 'react'
import WeatherInfo from './WeatherInfo'

const Country = (props) => {
    const {name, capital, population, languages, flag} = props
    
    return (
        <div>
            <h2>{name}</h2>
            <div>capital {capital}</div>
            <div>population {population}</div>

            <h3>languages</h3>
            <ul>
                {languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <div>
                <img src={flag} style={{height: "10%", width: "10%"  }} alt="Flag"/>
            </div>

            <WeatherInfo city={capital} />

        </div>
    )
}

export default Country