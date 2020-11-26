import React, {useEffect, useState} from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const WeatherInfo = (props) => {
    const {city} = props
    const [gotWeather, setGotWeather] = useState(false)
    const [speed, setSpeed] = useState()
    const [temp, setTemp] = useState()
    const [icons, setIcons] = useState([])
    const [direction, setDirection] = useState()

    const cityEncode = encodeURI(city)
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityEncode}`
    
    useEffect(()=>{
        axios
            .get(url)
            .then(response => {
                console.log(response)
                let data = response.data.current
                if (data === undefined)
                    return
                setSpeed(data['wind_speed'])
                setDirection(data['wind_dir'])
                setIcons(data['weather_icons'])
                setTemp(data['temperature'])
                setGotWeather(true)
            })
    }, [url])

    if (gotWeather === false) {
        return <></>
    }

    return (
        <div>
            <h3>Weather in {city}</h3>
            <div>temperature: {temp} Celsius</div>
            {icons.map(url => <img key={url} src={url} alt="weather icon" />)}
            <div>wind: {speed} mph direction {direction}</div>
        </div>
    )
}

export default WeatherInfo