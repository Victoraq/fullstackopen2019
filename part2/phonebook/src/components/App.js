import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addPerson}>
                <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
                <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}


const Filter = ({filter, handleFilter}) => {
    return (
        <div>
            filter show with <input value={filter} onChange={handleFilter}/>
        </div>
    )
}


const PersonInfo = ({person}) => {
    return (
        <p>{person.name}  {person.number}</p>
    )
}


const Persons = ({persons, filterBy}) => {
    const numbers = () => {
        // filter the persons by a string filter
        const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filterBy))

        return personsToShow.map(p => <PersonInfo key={p.name} person={p}/>)
    }

    return numbers()

}


const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filterName, setFilterName ] = useState('')


    // get data from the server
    const getData = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => setPersons(response.data))
    }
    
    useEffect(getData,[])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilterName(event.target.value.toLowerCase())
    }

    const addPerson = (event) => {
        event.preventDefault()

        // Look for the new name in the persons list to avoid repetition
        if (persons.find(p => p.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNumber('')
            return
        }
        
        const newPerson = { name: newName, number: newNumber }

        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            
            <Filter filter={filterName} handleFilter={handleFilterChange}/>
            
            <h3>Add a new</h3>
            
            <PersonForm 
                addPerson={addPerson} newName={newName} newNumber={newNumber} 
                handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>

            <Persons persons={persons} filterBy={filterName}/>
        </div>
    )
}

export default App
