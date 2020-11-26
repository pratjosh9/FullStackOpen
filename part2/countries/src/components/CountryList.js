import React  from 'react'
import ReactDOM from 'react-dom';
import Country from './Country'


function CountryEntry(props) {
    const {country, showFn} = props
    return (
        <div>
            {country.name}
            <button onClick={showFn}>show</button>
        </div>
    )
}

function CountryList({list}) {
    
    const displayFn = (country) => {
        return () => {
            ReactDOM.render(
                <Country {...country} />,
                document.getElementById("show")
            )
        }
    }

    if (list.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
  
    else if (list.length === 1) {
      return (
        <Country {...list[0]} />
      )
    }
    
    else {
      return (
        <>
          {list.map((country) => <CountryEntry key={country.name} country={country} showFn={displayFn(country)}/>)}
          <div id="show"></div>
        </>
      )
    }
}

export default CountryList