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


const Stats = ({country}) => {
    
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

        </div>
    )
}


const Countries = ({countries, filterBy, handleClick}) => {

    const toShow = () => {
        const countriesToShow = countries.filter(
                country => country.name.toLowerCase().includes(filterBy)
            )
        
        if (countriesToShow.length === 1) {
            return <Stats country={countriesToShow[0]}/>
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


    // get data from the server
    const getData = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }
    
    useEffect(getData,[])


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
            />
        </div>
    )
}

export default App
