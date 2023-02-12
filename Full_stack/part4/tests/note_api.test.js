const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const bcrypt = require('bcrypt')
const User = require('../models/user')




const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('verify blog posts id property', async () => {
    const blogs = await Blog.find({})
    blogs.forEach(blog => {
      expect(blog._id).toBeDefined()
    })
    const JsonBlogs = await helper.blogsInDb()
    JsonBlogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  }, 100000)
})

describe('addition of a new note', () => {
  test('a valid blog can be added', async () => {
    const newNote = {
      title: 'Browser test',
      author: 'jambk',
      url: 'abcde',
      likes: 30
    }

    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'Browser test'
    )
  })

  test('a valid blog without like can be added', async () => {
    const newNote = {
      title: 'Browser test test',
      author: 'ja',
      url: 'abcdeg',
    }

    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const blogs = blogsAtEnd.filter(r => r.title === 'Browser test test')
    expect(blogs[0].likes).toBe(0)
  }, 10000)

})

describe('fails with statuscode 400 if id is invalid', () => {
  test('a invalid blog without url can be not added', async () => {
    const newNote = {
      title: 'Browser test test',
      author: 'ja',
    }

    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  }, 10000)

  test('a invalid blog without title can be not added', async () => {
    const newNote = {
      author: 'ja',
      url: 'abcdeg',
    }

    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(400)
  }, 10000)

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update the likes of a blog', () => {

  test('update the likes', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newNote = {
      title: 'Browser test',
      author: 'jambk',
      url: 'abcde',
      likes: 40
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newNote)
      .expect(200)

    const blogs = await helper.blogsInDb()
    const endBlogs = blogs.filter(blog => blog.title === newNote.title)
    expect(endBlogs[0].likes).toBe(40)
  })

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('user without password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rootmo',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username or password is not defined')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('user without username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'rootmo',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username or password is not defined')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('user username length less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username:'ab',
      password: 'rootmo',
      name: 'Superuser',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('user password length less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password:'ab',
      username: 'rootmo',
      name: 'Superuser',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})






afterAll(async () => {
  await mongoose.connection.close()
})