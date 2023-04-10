const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', middleware.tokenExtractor ,async(request, response) => {
  const body = request.body
  if(body.url === undefined || body.title === undefined){
    response.status(400).end()
  }else{
    const user = request.user
    if(user === undefined){
      return response.status(401).json({
        error: 'token invalid'
      })
    }else{
      const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined? 0: body.likes,
        user: user._id
      })
      const result = await newBlog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      response.status(201).json(result)
    }
  }
})

blogsRouter.delete('/:id', middleware.tokenExtractor, async(request, response) => {
  console.log(request.params.id)
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if ( blog.user._id.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({
      error: 'token invalid'
    }).end()
  }

})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter