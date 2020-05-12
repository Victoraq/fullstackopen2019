const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

	if ('title' in request.body & 'url' in request.body) {
		const blog = new Blog(request.body)

		const savedBlog = await blog.save()
		response.status(201).json(savedBlog.toJSON())
	} else {
		response.status(400).json('ValidatonError')
	}
})

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = blogRouter