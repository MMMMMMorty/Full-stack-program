import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let setErrorMessage
let setMessage
let component
const blog = {
  title: 'blog title test',
  author: 'test author',
  url: 'someurl.com',
  likes: 10,
}

const user = {
  token: 'sometoken',
  username: 'someusername',
  name: 'somename',
}
beforeEach(() => {
  setErrorMessage = jest.fn()
  setMessage = jest.fn()

  component = render(
    <Blog
      blog={blog}
      user={user}
      setErrorMessage={setErrorMessage}
      setMessage={setMessage}
    />
  )
})

test('renders content', () => {
  const title = component.querySelector('.blogTitle')
  const author = component.querySelector('.blogAuthor')
  const url = component.querySelector('.blogUrl')
  const likes = component.querySelector('.blogLikes')
  expect(title).toBeDefined()
  expect(title).toHaveTextContent('blog title test')
  expect(author).toBeNull()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('clicking the button view event handler once', async () => {
  //A session is started to interact with the rendered component
  const button = component.getByText('view')
  fireEvent.click(button)
  const author = component.querySelector('.blogAuthor')
  const url = component.querySelector('.blogUrl')
  const likes = component.querySelector('.blogLikes')

  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('clicking the button like event handler twice', async () => {
  //A session is started to interact with the rendered component
  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  const likes = component.querySelector('.blogLikes')
  expect(likes).toBe(12)
})
