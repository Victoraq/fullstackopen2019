const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
                        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blog are returned as json', async () => {
    await api
        .get('/api/bloglist')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog list returns the correct amount of blogs', async () => {
    const response = await api.get('/api/bloglist')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})