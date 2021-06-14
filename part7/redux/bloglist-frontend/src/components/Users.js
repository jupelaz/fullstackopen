import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { getUsers } from '../reducers/usersReducer.js'
import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Link,
} from '@chakra-ui/react'
export const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  console.log(users)

  return (
    <>
      <Heading>Users</Heading>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th isNumeric>blogs created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users ? (
            users.map(user => (
              <Tr key={user.id}>
                <Td>
                  <Link as={RouterLink} to={`users/${user.id}`}>
                    {user.name}
                  </Link>
                </Td>
                <Td isNumeric>{user.blogs.length}</Td>
              </Tr>
            ))
          ) : (
            <Tr>There are no users</Tr>
          )}
        </Tbody>
      </Table>
    </>
  )
}
