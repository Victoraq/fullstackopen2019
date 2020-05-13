const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
    {
        "title": "some blog",
        "author": "the master",
        "url": "masterblog.com",
        "likes": "9001"
    },
    {
        "title": "another blog",
        "author": "the super master",
        "url": "supermasterblog.com",
        "likes": "9002"
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        "title": "some blog",
        "author": "the master",
        "url": "masterblog.com",
        "likes": "9001"
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}