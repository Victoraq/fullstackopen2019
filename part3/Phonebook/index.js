
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


phoneList = {
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }


app.get('/api/persons', (request, response) => { 
    response.json(phoneList["persons"]) 
}) 


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phoneList["persons"].find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})


app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${phoneList["persons"].length} people </p>
         <p>${new Date()}</p>`
    )
})


const generateId = () => {
	const min = phoneList["persons"].length

	const id = Math.floor(Math.random() * (10000000 - min) + min)
	
	return id
}


app.post('/api/persons', (request, response) => {

	const body = request.body
	
	if (!body.name) {
		return response.status(400).json({
			error: 'content missing'
		})
	}

	const person = {
		name: body.name,
		phone: body.number,
		id: generateId(),
	}

	phoneList["persons"] = phoneList["persons"].concat(person)
	
	response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phoneList["persons"] = phoneList["persons"].filter(person => person.id !== id)

    response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})