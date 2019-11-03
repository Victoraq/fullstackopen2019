import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const numbers = () => persons.map(p => <p key={p.name}>{p.name}</p>)

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        // Look for the new name in the persons list to avoid repetition
        if (persons.find(p => p.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            setNewName('')
            return
        }
        
        const newPerson = { name: newName }

        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    return (
    <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
        <h2>Numbers</h2>
        {numbers()}
    </div>
    )
}

export default App
