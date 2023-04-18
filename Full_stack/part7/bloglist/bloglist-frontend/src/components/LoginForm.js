import PropTypes from 'prop-types'
import { useState } from 'react'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const credential = {
        username,
        password,
      }
      // const user = await loginService.login()
      // props.setUser(user)
      dispatch(loginUser(credential))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.name} logged in`, 5000))
    } catch (exception) {
      dispatch(setNotification(`Wrong username or password`, 5000))
    }
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}
export default LoginForm
