const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

	const body = request.body

	if (!body.title || !body.url) {
		return response.status(400).json({
			error: 'title or url missing'
		})
	}

	const blog = new Blog(body)
	const savedBlog = await blog.save()

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