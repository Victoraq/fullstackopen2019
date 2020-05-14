const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

	const body = request.body

	const user = await User.findById(body.userId)

	if (!body.title || !body.url) {
		return response.status(400).json({
			error: 'title or url missing'
		})
	}

	const blog = new Blog({ ...body, user: user._id })

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		likes: body.likes
	}

	const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
	response.status(200).json(newBlog.toJSON())
})

module.exports = blogRouter