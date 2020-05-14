const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash: passwordHash })

    await user.save()
})

describe('when thre is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('user list return the correct amount of users', async () => {
        const usersAtStart = await helper.usersInDb()

        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(usersAtStart.length)

    })

})

describe('when insert wrong new users', () => {
    test('username must be unique otherwhise return status 400', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUserNotUnique = {
            username: usersAtStart[0].username,
            name: 'Matti Luukkainen',
            password: 'passtheword'
        }

        const response = await api.post('/api/users')
            .send(newUserNotUnique)
            .expect(400)
    })

    test('username and password must be given otherwise return status 400', async () => {
        const notCompletedUser = {
            name: "New User"
        }

        const response = await api.post('/api/users')
            .send(notCompletedUser)
            .expect(400)

        expect(response.body.error).toContain('username or password missing')
    })

    test('min length of username and password', async () => {
        const newUser = {
            name: "New User",
            username: "Us",
            password: "Pa"
        }

        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toContain('min length of 3')
    })

})