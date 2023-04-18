import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { getAllUsers } from '../reducers/usersReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

const Users = ({}) => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  dispatch(getAllUsers())

  return (
    <>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link className="linkPadding" to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
export default Users
