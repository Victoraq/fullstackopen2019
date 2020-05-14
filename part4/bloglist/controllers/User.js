const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response, next) => {
    const users = await User
        .find({}).populate('blogs')

    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!(body.username) || !(body.password)) {
        return response.status(400).json({
			error: 'username or password missing'
		})
    }

    if ((body.username.length < 3) || (body.password.length < 3)) {
        return response.status(400).json({
			error: 'min length of 3'
		})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter