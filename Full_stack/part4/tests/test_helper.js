const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'jam',
    url: 'abc',
    likes: 20,
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'jamb',
    url: 'abcd',
    likes: 25,
  },
]
const initialUsers = [
  {
    password:'fhdsaoufh',
    username: 'root',
    name: 'Superuser',
  },
  {
    password:'vfdvsfv',
    username: 'mo',
    name: 'momo',
  }
]
const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
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
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}