import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../reducers/usersReducer.js'

export const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  console.log(users)

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          ) : (
            <tr>There are no users</tr>
          )}
        </tbody>
      </table>
    </>
  )
}
