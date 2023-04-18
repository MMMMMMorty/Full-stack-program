import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import './App.css'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'
import User from './components/User'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@mui/material'


const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const [loginVisible, setLoginVisible] = useState(false)

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
      <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Button color="inherit">
            <Link to="/">bloglists</Link>
          </Button>
          <Button color="inherit">
            <Link to="/users">users</Link>
          </Button>
          <em>{user.username} logged in</em>
          <Button color="inherit" onClick={handleLogout}>
            logout
          </Button>                
        </Toolbar>
      </AppBar>

        <Link className="linkPadding" to="/">
          bloglists
        </Link>
        {/* <Blogs loginVisible={loginVisible} setLoginVisible={setLoginVisible} /> */}
        <Link className="linkPadding" to="/users">
          users
        </Link>

        {/* <Users /> */}
        <Routes>
          <Route
            path="/"
            element={
              <Blogs
                loginVisible={loginVisible}
                setLoginVisible={setLoginVisible}
              />
            }
          />
          <Route path="/blogs/:id" element={<Blog/>} />
          {/* <Blog key={blog.id} blog={blog} user={user} /> */}

          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
