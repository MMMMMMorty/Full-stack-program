import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewNote from './components/NewNote'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      // setUsername('')
      setPassword('')
      setMessage( user.name +' logged in')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    setUser(null)
    setUsername('')
    setPassword('')
    setLoginVisible(false)
    setMessage('Succefully Logout')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const HandleCreateBlog = async (event) => {
    event.preventDefault()

    try{
      const response = await blogService.createBlog({
        title: title, author: author, url: url
      }, user.token)

      console.log(response.data)
      setBlogs(blogs.concat(response.data))
      setUrl('')
      setAuthor('')
      setTitle('')
      setMessage('Succefully created a new blog by ' + username)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }



  if (user === null) {
    return (
      <div>
        <Notification message={message}/>
        <ErrorMessage message={errorMessage}/>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <ErrorMessage message={errorMessage}/>
      <div>{username} logged in<button type="submit" onClick={handleLogout}>logout</button></div>
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <NewNote
            title={title}
            author={author}
            url={url}
            HandleCreateBlog={HandleCreateBlog}
            HandleTitle={({ target }) => setTitle(target.value)}
            HandleAuthor={({ target }) => setAuthor(target.value)}
            HandleUrl={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      {blogs.map(blog =>
        <>
          <div>
            <Blog key={blog.id} blog={blog} user={user} setErrorMessage={setErrorMessage} setMessage={setMessage}/>
          </div>
        </>
      )}
    </div>
  )
}

export default App