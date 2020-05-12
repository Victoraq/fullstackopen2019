const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

blogRouter.post('/', (request, response) => {

	if ('title' in request.body & 'url' in request.body) {
		const blog = new Blog(request.body)

		blog
			.save()
			.then(result => {
				response.status(201).json(result)
			})
	} else {
		response.status(400).json('ValidatonError')
	}
})

module.exports = blogRouter