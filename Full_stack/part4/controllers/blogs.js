const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
  const body = request.body
  if(body.url === undefined || body.title === undefined){
    response.status(400).end()
  }else{
    const user = request.user

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined? 0: body.likes,
      user: user._id
    })
    const result = await newBlog.save()
    console.log(result)
    user.blogs = user.blogs.concat(result._id)
    user.save()
    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({
      error: 'token invalid'
    })
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