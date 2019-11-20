import React, { useState, useEffect } from 'react'
import phoneService from '../services/phones.js'

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


const DeleteButton = ({person, handleDelete}) => {
    return (
        <button onClick={() => handleDelete(person)}>delete</button>
    )
}


const PersonInfo = ({person, handleDelete}) => {
    return (
        <div>
            <p>{person.name}  {person.number} <DeleteButton person={person} handleDelete={handleDelete}/></p> 
        </div>
    )
}


const Persons = ({persons, filterBy, handleDelete}) => {
    const numbers = () => {
        // filter the persons by a string filter
        const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filterBy))

        return personsToShow.map(p => <PersonInfo key={p.name} person={p} handleDelete={handleDelete}/>)
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
        phoneService
            .getAll()
                .then(personsData => setPersons(personsData))
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

    const handleDelete = (person) => {
        if (window.confirm("Delete "+person.name)) {
            phoneService.deleteById(person.id)
            const newPersons = persons.filter(p => p.id !== person.id)
            setPersons(newPersons)
        }
    }

    const addPerson = (event) => {
        event.preventDefault()

        // Look for the new name in the persons list to avoid repetition
        const findPerson = persons.find(p => p.name === newName)
        if (findPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

                const updatedPerson = {...findPerson, number : newNumber}
                phoneService
                    .update(updatedPerson.id, updatedPerson)
                        .then(response => {
                            // mapping the persons to find out which person changed to replace by the new one
                            setPersons(persons.map(p => p.id !== response.id ? p : response))
                        })

            }   
            setNewName('')
            setNewNumber('')
            return
        }
        
        const newPerson = { name: newName, number: newNumber }

        phoneService.create(newPerson)
            .then(personsData => setPersons(persons.concat(personsData)) )
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

            <Persons persons={persons} filterBy={filterName} handleDelete={handleDelete}/>
        </div>
    )
}

export default App
