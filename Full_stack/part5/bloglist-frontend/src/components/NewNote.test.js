import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewNote from './NewNote'

let component
let title
let author
let url
let HandleCreateBlog
let HandleTitle
let HandleAuthor
let HandleUrl


beforeEach(() => {
  HandleCreateBlog = jest.fn()
  HandleTitle = jest.fn()
  HandleAuthor = jest.fn()
  HandleUrl = jest.fn()
  title = 'testTile'
  author = 'testAuthor'
  url = 'testUrl'

  component = render(
    <NewNote
      title={title}
      author={author}
      url={url}
      HandleCreateBlog={HandleCreateBlog}
      HandleTitle={HandleTitle}
      HandleAuthor={HandleAuthor}
      HandleUrl={HandleUrl}
    />
  )
})

test('clicking the button create event handler once', async () => {

  //A session is started to interact with the rendered component
  const button = component.getByText('create')
  fireEvent.click(button)
  //   const shouldBe = {
  //     title: title,
  //     author: author,
  //     url: url
  //   }
  //   console.log(HandleCreateBlog.mock.calls[0][0])

  expect(HandleCreateBlog.mock.calls).toHaveLength(1)
  expect(HandleCreateBlog.mock.calls[0][0].eventPhase).toBe(3)
//   expect(HandleCreateBlog.mock.calls[0][0].target).toContain('testTitle')
})


