import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Search = ({search, handleSearch}) => {
    return (
        <div>
            find countries <input value={search} onChange={handleSearch}></input>
        </div>
    )
}


const Country = ({country, handleClick}) => {
    return (
        <div>
            <p>{country.name} <button onClick={() => handleClick(country.name)}>show</button></p>
        </div>
    )
}


const Stats = ({country, weather, weatherHandle}) => {

    useEffect(weatherHandle,[])

    const languages = () => country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)

    return (
        <div>
            <h2>{country.name}</h2>

            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h3>languages</h3>
            <ul>
                {languages()}
            </ul>

            <img src={country.flag} alt="flag" width="10%" height="10%"/>

            <h3>Weather in {country.capital}</h3>
            <p><b>temperature:</b> {weather.main.temp} Celsius</p>
            <p><b>wind:</b> {weather.wind.speed} m/s</p>
        </div>
    )
}


const Countries = ({countries, filterBy, handleClick, weather, weatherHandle}) => {

    const toShow = () => {
        const countriesToShow = countries.filter(
                country => country.name.toLowerCase().includes(filterBy)
            )
        
        if (countriesToShow.length === 1) {
            const country = countriesToShow[0]
            return <Stats country={country} weather={weather} weatherHandle={() => weatherHandle(country.capital)}/>
        } else {
            return countriesToShow.map(
                country => <Country key={country.name} country={country} handleClick={handleClick}/>
            )
        }
    }

    const countriesFound = toShow()

    if (filterBy === '') {
        return ''
    }
    if (countriesFound.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else {
        return countriesFound
    }
}


const App = () => {
    const [ countries, setCountries] = useState([])
    const [ findCountry, setFindCountry ] = useState('')
    const [ weatherData, setWeatherData] = useState({})

    // get data from the server
    const getCountryData = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }

    const getWeatherData = (city) => {
        // change the appid to your key
        axios
            .get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&APPID=b6907d289e10d714a6e88b30761fae22')
            .then(response => setWeatherData(response.data))
    }
    
    useEffect(getCountryData,[])

    // initializes the object
    useEffect(() => getWeatherData('London'),[])
    console.log(weatherData)


    const handleFinder = (event) => {
        setFindCountry(event.target.value.toLowerCase())
    }


    const handleClick = (country) => {
        setFindCountry(country.toLowerCase())
    }


    return (
        <div>
            <Search search={findCountry} handleSearch={handleFinder}/>
            <Countries 
                countries={countries} filterBy={findCountry}  handleClick={handleClick}
                weather={weatherData} weatherHandle={getWeatherData}
            />
        </div>
    )
}

export default App
