require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Phone = require('./models/phones')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('request-body', (req, res) => {
	if (req.method === 'POST') {
		return JSON.stringify(req.body)
	}
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))


// Routes

app.get('/api/persons', (request, response) => { 
	Phone.find({}).then(persons => {
		response.json(persons)
	})
}) 


app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
	Phone.findById(id)
		.then(phone => {
			if (phone) {
				response.json(phone.toJSON())
			} else {
				next()
			}
		})
		.catch(error => next(error))
})


app.get('/info', (request, response, next) => {
	Phone.countDocuments((err, number) => 
		response.send(
			`<p>Phonebook has info for ${number} people </p>
			<p>${new Date()}</p>`
		)
	)
	.catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {

	const body = request.body
	
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'name or number missing'
		})
	}

	const phone = new Phone({
		name: body.name,
		number: body.number,
	})

	phone.save().then(savedPhone => {
		response.json(savedPhone.toJSON())
	})
	.catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const phone = {
		name: body.name,
		number: body.number,
	}

	Phone.findByIdAndUpdate(request.params.id, phone)
		.then(updatedPhone => {
			response.json(updatedPhone.toJSON())
		})
		.catch(error => next(error))

})


app.delete('/api/persons/:id', (request, response, next) => {
	Phone.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})


// error middlewares
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.log(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({error: 'malformatted id'})
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})