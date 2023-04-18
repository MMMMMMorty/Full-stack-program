import { useState, useEffect } from 'react'
import Blog from './components/Blog'
// import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewNote from './components/NewNote'
import './App.css'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser } from './reducers/userReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const tmp = useSelector((state) => state.blogs)
  const blogs = tmp
    .filter((blog) => blog != null)
    .sort((a, b) => b.likes - a.likes)
  const user = useSelector((state) => state.user)
  // const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  // }, [])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    // setUser(null)
    dispatch(logoutUser())
    setLoginVisible(false)
    dispatch(setNotification(`Succefully Logout`, 5000))
  }

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.username} logged in
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </div>
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <NewNote user={user} />
        </div>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      {blogs.map((blog) => (
        <>
          <div>
            <Blog key={blog.id} blog={blog} user={user} />
          </div>
        </>
      ))}
    </div>
  )
}

export default App
