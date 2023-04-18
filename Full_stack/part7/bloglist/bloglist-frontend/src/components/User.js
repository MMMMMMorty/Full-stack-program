import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <div>
        <b>added blogs</b>
      </div>
      <div>
        <ul>
          {user.blogs.map((blog) => (
            <div>
              <li>{blog.title}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default User
