import { useState } from 'react'
// import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'

const NewNote = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  // const blogs = useSelector(state => state.blogs )

  const HandleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const createdBlog = {
        title: title,
        author: author,
        url: url,
      }
      dispatch(appendBlog(createdBlog, props.user))
      // props.setBlogs(blogs.concat(response.data))
      setUrl('')
      setAuthor('')
      setTitle('')
      dispatch(
        setNotification(
          `Succefully created a new blog by ${props.user.username}`,
          5000
        )
      )
    } catch (exception) {
      dispatch(setNotification(`wrong`, 5000))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={HandleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}
export default NewNote
