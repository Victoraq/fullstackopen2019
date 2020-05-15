const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response, next) => {
	const blogs = await Blog
		.find({}).populate('user')
	response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {

	const body = request.body

	if (!request.token) {
		return response.status(401).json({ error: 'token missing' })
	}

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	const user = await User.findById(decodedToken.id)

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

blogRouter.delete('/:id', async (request, response, next) => {
	
	if (!request.token) {
		return response.status(401).json({ error: 'token missing' })
	}

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	const blog = await Blog.findById(request.params.id)

	if ( blog.user.toString() == decodedToken.id.toString() ) {
		await blog.remove()
		return response.status(204).end()
	} else {
		return response.status(401).json({ error: 'blogs can only be deleteds by his owners'})
	}
})

blogRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	const blog = {
		likes: body.likes
	}

	const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
	response.status(200).json(newBlog.toJSON())
})

module.exports = blogRouter