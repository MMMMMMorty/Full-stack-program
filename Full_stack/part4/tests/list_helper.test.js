const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

test('find favourite blog', () => {
  const blogs = [{
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 10
  },
  {
    title: 'Canonical',
    author: 'Edsger',
    likes: 12
  }]
  const expected = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }
  const result = listHelper.favoriteBlog(blogs)
  expect(result).toEqual(expected)
})

test('find the mostBlogs', () => {
  const blogs = [{
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  },
  {
    title: 'Canonical',
    author: 'Edsger',
    likes: 12
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 10
  }]
  const expected = {
    author: 'Edsger W. Dijkstra',
    blogs: 2
  }
  const result = listHelper.mostBlogs(blogs)
  expect(result).toEqual(expected)
})

test('find the mostLikes', () => {
  const blogs = [{
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  },
  {
    title: 'Canonical',
    author: 'Edsger',
    likes: 12
  },
  {
    title: 'Canonical',
    author: 'Edsger',
    likes: 12
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 10
  }]
  const expected = {
    author: 'Edsger',
    likes: 24
  }
  const result = listHelper.mostLikes(blogs)
  expect(result).toEqual(expected)
})