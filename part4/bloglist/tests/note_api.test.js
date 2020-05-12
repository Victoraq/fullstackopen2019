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

test('id property is named correctly', async () => {
    const response = await api.get('/api/bloglist')

    const blog = response.body[0]

    expect(blog.id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        "title": "some new blog",
        "author": "the new master",
        "url": "newmasterblog.com",
        "likes": "8999"
    }

    await api.post('/api/bloglist')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('some new blog')

})

test('default value of likes is 0', async () => {
    const newBlog = {
        "title": "some new blog",
        "author": "the new master",
        "url": "newmasterblog.com"
    }

    await api.post('/api/bloglist')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title == newBlog.title)

    expect(addedBlog.likes).toEqual(0)
})

afterAll(() => {
    mongoose.connection.close()
})